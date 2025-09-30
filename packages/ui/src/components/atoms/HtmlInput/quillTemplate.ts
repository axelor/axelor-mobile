/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export function buildQuillHtml({
  initialHtml = '',
  placeholder = '',
  readOnly = false,
  pinToolbar = true,
  colors = {
    background: 'white',
    text: 'rgb(32,35,42)',
    placeholder: 'rgba(0,0,0,0.6)',
    accent: '#06c',
  },
}: {
  initialHtml?: string;
  placeholder?: string;
  readOnly?: boolean;
  pinToolbar?: boolean;
  colors?: {
    background: string;
    text: string;
    placeholder: string;
    accent: string;
  };
}) {
  const safeHtml = (initialHtml || '')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
  const toolbarPinCss = pinToolbar
    ? `
      /* Pin toolbar and center its content */
      .ql-toolbar.ql-snow {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        /* Remove default snow borders and add a subtle top border only */
        border: 0 !important;
        border-top: 1px solid rgba(0,0,0,0.12);
        background: ${colors.background};
      }
      /* Normalize group spacing so centering looks balanced */
      .ql-toolbar.ql-snow .ql-formats { margin: 0 6px; }
      .ql-toolbar.ql-snow .ql-formats:last-child { margin-right: 0; }
      /* Reserve space for the toolbar */
      #editor { height: calc(100% - 42px); }
    `
    : '';
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet" />
      <style>
        html, body { height: 100%; width: 100%; margin: 0; padding: 0; background: ${colors.background}; }
        #container { height: 100%; }
        #editor { background: ${colors.background}; color: ${colors.text}; }
        .ql-editor.ql-blank::before { color: ${colors.placeholder}; }
        /* Remove default snow borders around the editor */
        .ql-container.ql-snow { border: 0 !important; }
        .ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill { fill: ${colors.accent}; }
        .ql-snow .ql-stroke { stroke: ${colors.text}; }
        ${toolbarPinCss}
      </style>
    </head>
    <body>
      <div id="container"><div id="editor">${safeHtml}</div></div>
      <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
      <script>
        (function(){
          var quill = new Quill('#editor', {
            theme: 'snow',
            placeholder: ${JSON.stringify(placeholder)},
            readOnly: ${readOnly ? 'true' : 'false'},
            modules: {
              // Remove header level picker from toolbar
              toolbar: [['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['link']]
            }
          });
          var hasFocus = false;
          var emitFocus = function(){
            if (hasFocus) return;
            hasFocus = true;
            try { window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'onFocus' })); } catch(e) {}
          };
          var emitBlur = function(){
            if (!hasFocus) return;
            hasFocus = false;
            try { window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'onBlur' })); } catch(e) {}
          };
          quill.root.addEventListener('focus', emitFocus);
          quill.root.addEventListener('blur', emitBlur);
          window.__axelorQuill = {
            focus: function(){ try { quill.focus(); } catch(e){} },
            blur: function(){ try { quill.blur(); } catch(e){} }
          };
          function sendHeight() {
            try {
              var el = document.querySelector('.ql-editor');
              if (!el) return;
              var h = el.scrollHeight || el.clientHeight || 0;
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'onHeight', message: h }));
            } catch(e) {}
          }
          // initial height after first paint
          setTimeout(sendHeight, 0);
          quill.on('text-change', function(){
            try {
              var html = document.querySelector('#editor').children[0].innerHTML;
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'onChange', message: html }));
              sendHeight();
            } catch(e) {}
          });
        })();
      </script>
    </body>
  </html>`;
}
