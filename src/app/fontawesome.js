import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faWindows, faLinux, faTwitter, faReddit, faTelegram } from '@fortawesome/free-brands-svg-icons';

import {
  faCheckCircle, faMicrochip, faTrashAlt, faPaperPlane, faSpinner, faFlask, faInfoCircle, faPen, faTools,  faCheck,
  faPlus, faCog, faExclamationTriangle, faQuestionCircle, faSyncAlt, faInfinity, faDownload, faCopy, faPlug, faTimesCircle
} from '@fortawesome/free-solid-svg-icons';


export default function () {
  library.add(faGithub, faWindows, faLinux, faTwitter, faReddit, faTelegram, faCheckCircle, faMicrochip, faTrashAlt,
    faPaperPlane, faSpinner, faFlask, faInfoCircle, faPen, faTools, faCheck, faPlus, faCog, faExclamationTriangle,
    faQuestionCircle, faSyncAlt, faInfinity, faDownload, faCopy, faPlug, faTimesCircle);
}
