#About
datable.js is a lightweight, customizable, bootstraps-friendly jQuery plugin to properly format dates in inputs and verify that the date is valid.

#Install
After downloading datable, just include the file right above the closing `<body>` tag and then initialize the function.

`<script type="text/javascript" src="datable.min.js"></script>`

`<script> $('input[data-datable]').datable();</script>`

That's all! Your options are handled through custom data attributes in each element. View the source of this page!

#Attributes

`data-datable` - any combination of `dd`, `mm`, `yy`or `yyyy` in any order is accepted.

`data-datable-divider` - default value is ` / ` but can be set to any string.

`data-datable-era` - either a date string formatted as such: `yyyy,mm,dd` or an array formatted as `[yyyy,mm,dd]`. A string is an exact date, while an array is any combination of positive or negative numbers that will offset from the current date

`data-datable-era2` - if not referenced, the second point in the era will be today's date. Follows the same rules as `data-datable-era`

#Demo

View the [demo](http://invot.github.io/datable.js/) for instructions!