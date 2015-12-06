# angular-trap-all

**angular-trap-all** disallows tabbing out of a specified area. It's useful when implementing modal dialogs to prevent the user from interacting with what's behind a modal mask by simply tabbing out of the dialog.

This is similar to [**angular-tab-trap**](http://myplanet.github.io/angular-tab-trap/), but a lot better.
It works for all accessible form elements inside a modal dialog, including **select** tag.

# Download
**via Bower**
```
bower install angular-trap-all --save
```

# Installation
1. Include Angular-trap-all.js in your application after Angular.
```
<script src="bower_components/angular-trap-all/angular-trap-all.js"></script> 
```
2. Inject it in your module as dependency.
```javascript
    angular.module('myModule', [
    'gui.trapAll'
    ]);
```
3. And then use as either <trap-all> or <div trap-all></div>. And ofcourse specify trap start and end points in HTML. 
```html
	<trap-all>

	<div class="modal-header">
		<button class="modal-header-close icon icon-size-sm icon-cross" ng-click="vm.closePopup()" **data-trap="start"** aria-label="Hit enter to close popup">
		</button>
		<span class="modal-header-title" ng-cloack>{{vm.popupTitle}}</span>
	</div>
	
	<div class="modal-body" ng-transclude> 
	</div>
	
	<div class="modal-footer">
        <button type="button" class="btn btn-faint" ng-click="vm.closePopup()"  aria-label="Hit enter to close popup">
            Close
        </button>
        <button type="button" class="btn btn-hero" **data-trap="end"** aria-label="Hit enter to save changes">Save changes</button>
    </div>
    
	</trap-all>
```
