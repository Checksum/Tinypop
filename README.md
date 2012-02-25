### TINYPOP - Lightweight growl like notifications in JavaScript

Tinypop is a lightweight JS library to display growl like notifications. It weights under 2KB (JS+CSS) when compressed with YUI Compressor. You can see a demo [here](http://iambot.net/demo/tinypop/)

#### Installation

1) Include the JS and CSS in the head section of your html

```html
<script src="tinypop.js"></script>
<link rel="stylesheet" href="tinypop.css">
```

2) Create an instance of the popup by passing the message and options

```javascript
var popup = new TINYPOP("this is a new popup", {position:'center',sticky:true});
```

3) You can change the message and close the popup by reusing the instance

```javascript
popup.show("New message");
popup.hide();
```

###### Options

You can pass an options object along with the constructor. The available options are

<table>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>position</td>
		<td>String</td>
		<td>The posision of the popup. Available positions - bottom-right, bottom-left, top-right, top-left, center-right, center-left, center</td>
	</tr>
	<tr>
		<td>timeout</td>
		<td>Number</td>
		<td>How long should the popup be visibile before fading out (in millisecond)</td>
	</tr>
	<tr>
		<td>sticky</td>
		<td>Boolean</td>
		<td>If true, the popup will be sticky and will not disapper. To close, use popup.close() or user has to close the popup manually</td>
	</tr>
	<tr>
		<td>speed</td>
		<td>String</td>
		<td>Animation speed. Available values - slow, normal, fast
	</tr>
</table>

