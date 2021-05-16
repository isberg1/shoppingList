import {useContext} from 'react';
import context from '../Context';

export default function useSettings() {
  return useContext(context);
}
