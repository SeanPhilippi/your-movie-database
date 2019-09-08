import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoePrints,
  faSignInAlt,
  faSignOutAlt,
  faChevronRight,
  faSignature,
  faComments,
  faFileAlt as fasFileAlt,
  faFileContract,
  faAward,
  faFilm
} from '@fortawesome/free-solid-svg-icons';
import {
  faUserCircle,
  faUser,
  faFileAlt,
  faListAlt
} from '@fortawesome/free-regular-svg-icons';

const fontAwesome = library.add(
  faUserCircle,
  faShoePrints,
  faListAlt,
  faSignInAlt,
  faSignOutAlt,
  faChevronRight,
  faComments,
  faFileContract,
  faSignature,
  faUser,
  faFileAlt,
  fasFileAlt,
  faAward,
  faFilm
);

export default fontAwesome;