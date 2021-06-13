import {useContext} from 'react';
import settingsContext from '../SettingsContext/SettingsContext';

export default function useSettings() {
  return useContext(settingsContext);
}
