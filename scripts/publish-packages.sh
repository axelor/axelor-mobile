#!/usr/bin/env bash
set -uo pipefail

readonly PUBLISH_ATTEMPTS=3
readonly REGISTRY_CHECK_ATTEMPTS=6
readonly REGISTRY_CHECK_DELAY_SECONDS=10

list_workspace_locations() {
  yarn -s workspaces info | node -e '
    const workspaces = JSON.parse(require("fs").readFileSync(0, "utf8"));
    Object.values(workspaces).forEach(({location}) => console.log(location));
  '
}

read_manifest_field() {
  node -p "require('./$1/package.json').$2"
}

is_published() {
  local name=$1 version=$2
  [ "$(npm view "$name@$version" version --prefer-online 2>/dev/null < /dev/null)" = "$version" ]
}

wait_until_published() {
  local name=$1 version=$2
  for _ in $(seq "$REGISTRY_CHECK_ATTEMPTS"); do
    is_published "$name" "$version" && return 0
    sleep "$REGISTRY_CHECK_DELAY_SECONDS"
  done
  return 1
}

publish_workspace() {
  local location=$1 name version output
  name=$(read_manifest_field "$location" name)
  version=$(read_manifest_field "$location" version)

  if is_published "$name" "$version"; then
    echo "$name@$version already published, skipping"
    return 0
  fi

  for attempt in $(seq "$PUBLISH_ATTEMPTS"); do
    if output=$(cd "$location" && npm publish 2>&1 < /dev/null | tee /dev/stderr); then
      echo "$name@$version published"
      return 0
    fi

    if grep -qiE "EPUBLISHCONFLICT|cannot publish over the previously published" <<< "$output"; then
      echo "$name@$version already exists on the registry, skipping"
      return 0
    fi

    echo "Publishing $name@$version reported an error (attempt $attempt/$PUBLISH_ATTEMPTS), checking the registry"
    if wait_until_published "$name" "$version"; then
      echo "$name@$version is available on the registry despite the error"
      return 0
    fi
  done

  return 1
}

mapfile -t locations < <(list_workspace_locations)
failures=()

for location in "${locations[@]}"; do
  publish_workspace "$location" || failures+=("$location")
done

if [ ${#failures[@]} -gt 0 ]; then
  echo "Failed to publish: ${failures[*]}" >&2
  exit 1
fi
