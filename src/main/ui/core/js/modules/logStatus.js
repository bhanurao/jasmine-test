(function() {
    'use strict';

    RSM.Modules.LogStatus = {
        refManIcon: null,
        refLoginOption: null,
        refLogoutOption: null,
        refRegisterOption: null,
        isChecked: false,

        hasSoldTo: function() {
            // check use response cookie has sold to status
            var userAccepted = RSM.Utils.Cookies.getCookie('status');
            return (userAccepted >= 3);
        },

        checkStatus: function() {
            // check status cookie to enable man icon
            var userAccepted = RSM.Utils.Cookies.getCookie('status');
            return ($.isNumeric(userAccepted));
        },

        updateIcon: function(userStatus) {
            // set data session attribute which is used by CSS query
            // to turn icon green
            this.refManIcon.attr('data-session', userStatus);
            this.refLoginOption.attr('data-session', userStatus);
            this.refLogoutOption.attr('data-session', userStatus);
            // change true to userStatus - currently disabled
            //this.refRegisterOption.attr('data-session', true);
            this.refRegisterOption.attr('data-session', userStatus);
        },

        updateIconColor: function() {
            var userStatus;
            userStatus = this.checkStatus();
            RSM.Modules.LogStatus.updateIcon(userStatus);
            //Make sure status matches with server if cookie is there
            if (userStatus && !this.isChecked) {
                this.checkUserLoggedOn();
            }
        },

        checkUserLoggedOn: function() {
            // Check user session is active on server
            var _url, _type;
            _url = contextPath + '/services/login/status/v1';
            _type = 'GET';
            RSM.Utils.AjaxService.processXHR(_url, _type,
                RSM.Modules.LogStatus.updateUserStatusAjax);
        },

        updateUserStatusAjax: function(data) {
            RSM.Modules.LogStatus.isChecked = true;
            RSM.Modules.LogStatus.updateIcon($.isNumeric(data.Status));
        },

        init: function(elmIcon, elmLogin, elmLogout, elmRegister, checkIcon) {
            this.refManIcon = $(elmIcon);
            this.refLoginOption = $(elmLogin);
            this.refLogoutOption = $(elmLogout);
            this.refRegisterOption = $(elmRegister);
            if (this.refManIcon.length > 0 && checkIcon) {
                this.updateIconColor();
            }
        }
    };

}());

(function() {
    'use strict';

    //call login check to run man green
    RSM.Modules.LogStatus.init('.icon-user', '.js-menu-login', '.js-menu-logout', '.js-menu-register', true);


}());