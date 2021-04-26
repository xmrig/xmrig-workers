'use strict';

import React from 'react';
import cogoToast from 'cogo-toast';


export function showSuccess(text, timeout = 5000) {
  cogoToast.success(text, { hideAfter: timeout / 1000 });
}


export function showInfo(text, timeout = 5000) {
  cogoToast.info(text, { hideAfter: timeout / 1000 });
}


export function showWarning(text, timeout = 5000) {
  cogoToast.warn(text, { hideAfter: timeout / 1000 });
}


export function showError(text, timeout = 5000) {
  cogoToast.error(text, { hideAfter: timeout / 1000 });
}
