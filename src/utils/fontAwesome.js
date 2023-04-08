import { library } from '@fortawesome/fontawesome-svg-core/v6';
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
  faFilm,
  faBook,
  faVoteYea,
} from '@fortawesome/free-solid-svg-icons';
import {
  faUserCircle,
  faUser,
  faFileAlt,
  faListAlt,
  faEdit,
} from '@fortawesome/free-regular-svg-icons';

library.config.autoAddCss = false;
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
  faFilm,
  faEdit,
  faBook,
  faVoteYea
);

export default fontAwesome;
