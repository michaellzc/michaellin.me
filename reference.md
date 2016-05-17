---
layout: page
title: Reference
---

<hr>
{% for friend in site.friends: %}
<div class="friend-reference" title="{{friend.description}}">
    <img src="{{friend.favicon}}">
    <a href="{{friend.url}}" target="_blank">{{friend.title}}</a> - {{friend.description}}
</div>
<hr class="reference-padding">
{% endfor %}
