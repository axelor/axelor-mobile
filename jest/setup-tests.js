import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import {TextEncoder} from 'text-encoding';

configure({adapter: new Adapter()});

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
