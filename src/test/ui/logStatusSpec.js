(function() {
	'use strict';

	jasmine.getFixtures().fixturesPath = 'src/test/ui/fixtures';

	describe('Log status ', function() {
		var data = {'Status':'1'};

		beforeEach(function() {
			loadFixtures('tmpl-login.html');
		});

		it('should exist elements', function() {
			expect($('.icon-user')).toExist();
			expect($('.js-menu-login')).toExist();
			expect($('.js-menu-logout')).toExist();
			expect($('.js-menu-register')).toExist();

		});

		it('should not update icon if man icon does not exist', function() {
			$('.icon-user').remove();
			RSM.Modules.LogStatus.init('.icon-user', '.js-menu-login', '.js-menu-logout', '.js-menu-register', true);
			spyOn(RSM.Modules.LogStatus, 'updateIconColor');
			expect(RSM.Modules.LogStatus.updateIconColor).not.toHaveBeenCalled();
		});

		it('should only do server check if session cookie is available', function() {

			spyOn(RSM.Modules.LogStatus, 'init').and.callThrough();
			spyOn(RSM.Modules.LogStatus, 'updateIconColor').and.callThrough();
			spyOn(RSM.Modules.LogStatus, 'checkUserLoggedOn').and.callThrough();
			spyOn(RSM.Modules.LogStatus, 'checkStatus').and.returnValue(true);
			spyOn(RSM.Modules.LogStatus, 'hasSoldTo').and.callThrough();

			spyOn(RSM.Modules.LogStatus, 'updateUserStatusAjax').and.callThrough();
			spyOn(RSM.Utils.AjaxService, 'processXHR').and.callThrough();

			RSM.Modules.LogStatus.init('.icon-user', '.js-menu-login', '.js-menu-logout', '.js-menu-register', true);

			expect(RSM.Modules.LogStatus.init).toHaveBeenCalled();
			expect(RSM.Modules.LogStatus.updateIconColor).toHaveBeenCalled();
			expect(RSM.Modules.LogStatus.checkUserLoggedOn).toHaveBeenCalled();
			expect(RSM.Utils.AjaxService.processXHR.calls.count()).toBe(1);

			RSM.Modules.LogStatus.updateUserStatusAjax(data);

			expect(RSM.Modules.LogStatus.updateUserStatusAjax).toHaveBeenCalled();

			RSM.Modules.LogStatus.hasSoldTo();
			expect(RSM.Modules.LogStatus.hasSoldTo).toHaveBeenCalled();
			expect(RSM.Modules.LogStatus.hasSoldTo()).toBe(false);

		});

	});

})();