$(document).ready(function() {

  var controller = new AdminModuleCard();
  controller.init();

});

/**
 * AdminModule card Controller.
 * @constructor
 */
var AdminModuleCard = function() {
    /* Selectors for module action links (uninstall, reset, etc...) to add a confirm popin */
    this.moduleActionMenuInstallLinkSelector = 'a.module_action_menu_install';
    this.moduleActionMenuEnableLinkSelector = 'a.module_action_menu_enable';
    this.moduleActionMenuUninstallLinkSelector = 'a.module_action_menu_uninstall';
    this.moduleActionMenuDisableLinkSelector = 'a.module_action_menu_disable';
    this.moduleActionMenuResetLinkSelector = 'a.module_action_menu_reset';
    this.moduleActionMenuUpdateLinkSelector = 'a.module_action_menu_update';

  /**
   * Initialize all listeners and bind everything
   * @method init
   * @memberof AdminModuleCard
   */
  this.init = function() {
    this.initActionButtons();
  };

  this.initActionButtons = function() {
      // action buttons on a module card
      var confirmAction = function(action, element) {
          var modal = $('#'+$(element).data('confirm_modal'));
          if (modal.length != 1) {
              return true;
          }
          modal.first().modal('show');;
          return false; // do not allow a.href to reload the page. The confirm modal dialog will do it async if needed.
      };
      var dispatchPreEvent = function(action, element) {
          var event = jQuery.Event('module_card_action_event');
          $(element).trigger(event, [action]);
          if (event.isPropagationStopped() !== false || event.isImmediatePropagationStopped() !== false) {
              return false; // if all handlers have not been called, then stop propagation of the click event.
          }
          return (event.result !== false); // explicit false must be set from handlers to stop propagation of the click event.
      };
      $(this.moduleActionMenuInstallLinkSelector).on('click', function() {
          return dispatchPreEvent('install', this) && confirmAction('install', this);
      });
      $(this.moduleActionMenuEnableLinkSelector).on('click', function() {
          return dispatchPreEvent('enable', this) && confirmAction('enable', this);
      });
      $(this.moduleActionMenuUninstallLinkSelector).on('click', function() {
          return dispatchPreEvent('uninstall', this) && confirmAction('uninstall', this);
      });
      $(this.moduleActionMenuDisableLinkSelector).on('click', function() {
          return dispatchPreEvent('disable', this) && confirmAction('disable', this);
      });
      $(this.moduleActionMenuResetLinkSelector).on('click', function() {
          return dispatchPreEvent('reset', this) && confirmAction('reset', this);
      });
      $(this.moduleActionMenuUpdateLinkSelector).on('click', function() {
          return dispatchPreEvent('update', this) && confirmAction('update', this);
      });
  };

};
