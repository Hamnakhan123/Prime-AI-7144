// session-04_charlimit-plugin.js – a small, complete jQuery plugin
// Usage: $('textarea').charLimit({ max: 140, warnAt: 20 });
(function ($) {
  'use strict';

  $.fn.charLimit = function (options) {
    // 1. Merge user options with defaults (later objects win)
    const settings = $.extend({}, $.fn.charLimit.defaults, options);

    // 2. Run for EVERY matched element and return `this` so calls can be chained
    return this.each(function () {
      const $field = $(this);
      if ($field.data('charLimit')) return;            // already initialised – do nothing

      const $counter = $('<div class="form-text char-limit"></div>').insertAfter($field);
      $field.attr('maxlength', settings.max);

      function update() {
        const left = settings.max - $field.val().length;
        $counter.text(settings.format(left, settings.max))
                .toggleClass(settings.warnClass, left <= settings.warnAt);
        $field.trigger('charlimit:update', [left]);      // custom event other code can listen to
      }

      $field.on('input.charLimit', update).data('charLimit', true);
      update();
    });
  };

  // 3. Public defaults – users can change them once for the whole site
  $.fn.charLimit.defaults = {
    max: 100,
    warnAt: 10,
    warnClass: 'text-danger',
    format: (left, max) => `${left} of ${max} characters left`,
  };
})(jQuery);
