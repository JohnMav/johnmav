(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{137:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(150),c=a(152);t.default=function(){return r.a.createElement(i.a,null,r.a.createElement(c.a,{title:"404: Not found"}),r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},145:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return f}),a.d(t,"StaticQueryContext",function(){return m}),a.d(t,"StaticQuery",function(){return p});var n=a(0),r=a.n(n),i=a(4),c=a.n(i),o=a(144),l=a.n(o);a.d(t,"Link",function(){return l.a}),a.d(t,"withPrefix",function(){return o.withPrefix}),a.d(t,"navigate",function(){return o.navigate}),a.d(t,"push",function(){return o.push}),a.d(t,"replace",function(){return o.replace}),a.d(t,"navigateTo",function(){return o.navigateTo});var s=a(146),u=a.n(s);a.d(t,"PageRenderer",function(){return u.a});var d=a(32);a.d(t,"parsePath",function(){return d.a});var m=r.a.createContext({}),p=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function f(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:c.a.object,query:c.a.string.isRequired,render:c.a.func,children:c.a.func}},146:function(e,t,a){var n;e.exports=(n=a(147))&&n.default||n},147:function(e,t,a){"use strict";a.r(t);a(33);var n=a(0),r=a.n(n),i=a(4),c=a.n(i),o=a(51),l=a(2),s=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},t.default=s},148:function(e,t,a){},149:function(e,t,a){},150:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(151),c=a(145),o=(a(148),function(e){var t=e.headerName,a=e.title;return r.a.createElement("header",null,r.a.createElement("div",{className:"header-inner"},r.a.createElement("section",{className:"container-header_title"},r.a.createElement("h1",{className:"header-title"},t),r.a.createElement("h2",{className:"header-subtitle"},a))),r.a.createElement("nav",{className:"nav-container"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(c.Link,{to:"/"},"Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(c.Link,{to:"/blog"},"Blog")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(c.Link,{to:"/about"},"About")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(c.Link,{to:"/contact"},"Contact"))))});a(149),t.a=function(e){var t=e.children;return r.a.createElement("div",{className:"container"},r.a.createElement(o,{headerName:"John Mav",title:"Data Scientist"}),r.a.createElement("main",null,r.a.createElement("section",{className:"content"},t)),r.a.createElement("footer",null,r.a.createElement(i.b,null),r.a.createElement(i.d,null),r.a.createElement(i.c,null),r.a.createElement(i.a,null)))}},152:function(e,t,a){"use strict";var n=a(153),r=a(0),i=a.n(r),c=a(4),o=a.n(c),l=a(154),s=a.n(l),u=a(145);function d(e){var t=e.description,a=e.lang,r=e.meta,c=e.keywords,o=e.title;return i.a.createElement(u.StaticQuery,{query:m,render:function(e){var n=t||e.site.siteMetadata.description;return i.a.createElement(s.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:o},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:n}].concat(c.length>0?{name:"keywords",content:c.join(", ")}:[]).concat(r)})},data:n})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.array,keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},t.a=d;var m="1025518380"},153:function(e){e.exports={data:{site:{siteMetadata:{title:"John Mav",description:"John Mavs Portfolio and about site",author:"@johnmav"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-70a238d8b81cf949dd09.js.map