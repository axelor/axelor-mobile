import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import 'react-native/jest/setup';

configure({adapter: new Adapter()});
