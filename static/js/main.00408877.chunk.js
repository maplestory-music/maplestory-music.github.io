(this["webpackJsonpmaplestory-music"]=this["webpackJsonpmaplestory-music"]||[]).push([[0],{173:function(e,t,n){},174:function(e,t,n){},231:function(e,t,n){"use strict";n.r(t);var r,a=n(0),o=n.n(a),i=n(27),c=n.n(i),l=(n(173),n(10)),s=n(6),u=n(11),d=(n(174),n(80)),b=n(16),f=n(31),h=n(250),g=n(254),m=n(244),p=n(137),j=n(3),O=function(){return Object(j.c)("div",{children:[Object(j.c)("div",{css:Object(u.a)(r||(r=Object(l.a)(["\n        @media (min-width: 1024px) {\n          margin-right: 33vw;\n        }\n      "]))),children:[Object(j.b)("h2",{children:"About"}),Object(j.b)("p",{children:"This database catalogs music from every region of MapleStory and aims to be the definitive resource for MapleStory music. It will be updated whenever new songs are added to the client of any region."}),Object(j.b)("h6",{children:Object(j.b)("b",{children:"Music Playback"})}),Object(j.b)("p",{children:"Music is played within an embedded YouTube player. The track is looped upon completion, unless in the shuffled playlist mode (see below)."}),Object(j.b)("h6",{children:Object(j.b)("b",{children:"Shuffled Playlist"})}),Object(j.b)("p",{children:"The shuffled playlist feature randomizes the entire music collection and plays upcoming songs automatically. Skip to the next track or return to the previous track with the controls under the media player. When filters are applied to the grid, the song pool is limited to the filtered entries."}),Object(j.b)("h6",{children:Object(j.b)("b",{children:"Grid Controls"})}),Object(j.b)("p",{children:"To sort by a column, press the column header. Hover over a column header and press the menu icon to access the advanced filter dialog. Mobile users can access the filter dialog by pressing and holding the column header."}),Object(j.b)("h6",{children:Object(j.b)("b",{children:"Language"})}),Object(j.b)("p",{children:"Language support is a work in progress. Changing the language will translate metadata displayed for the songs in the grid. If there are no translations for an entry, English will be used as the default language."})]}),Object(j.b)("h2",{children:"Source"}),Object(j.b)("p",{children:"The following GitHub projects power this site."}),Object(j.c)("div",{className:"gh-project-entry",children:[Object(j.b)(p.a,{href:"https://github.com/maplestory-music/maplebgm-db","data-size":"large","data-show-count":!0,"aria-label":"Star maplestory-music/maplebgm-db on GitHub",children:"Star"}),Object(j.b)("h5",{className:"gh-project-name",children:"maplebgm-db: Definitive MapleStory music database"})]}),Object(j.c)("div",{className:"gh-project-entry",children:[Object(j.b)(p.a,{href:"https://github.com/maplestory-music/maplestory-music.github.io","data-size":"large","data-show-count":!0,"aria-label":"Star maplestory-music/maplestory-music.github.io on GitHub",children:"Star"}),Object(j.b)("h5",{className:"gh-project-name",children:"maplestory-music: MapleStory Music website"})]})]})},v=n(2),y=n(249),C=n(241),k=n(251),S=n(238),w=n(55),x=n(253),B=n(98),A=(n(202),n(203),n(204),n(237)),M=n(1),P="site-preferences",T=o.a.createContext(void 0),D={hideMinorTracks:!1};function N(e){localStorage.setItem(P,JSON.stringify(e))}var F,z=function(e){var t=e.children,n=o.a.useState(function(){var e=localStorage.getItem(P);if(null===e){var t=D;return N(t),t}return JSON.parse(e)}()),r=Object(s.a)(n,2),a=r[0],i=r[1];return Object(M.jsx)(T.Provider,{value:{settings:a,setSettings:function(e){i(e),N(e)}},children:t})},_=function(){var e=o.a.useContext(T);if(!e)throw new Error("useSettings must be used within a SettingsProvider");return e},W=o.a.createContext(void 0),L=function(e){var t=e.children,n=o.a.useState([]),r=Object(s.a)(n,2),i=r[0],c=r[1],l=_().settings;return Object(a.useEffect)((function(){fetch("https://raw.githubusercontent.com/maplestory-music/maplebgm-db/prod/bgm.min.json").then((function(e){return e.json()})).then((function(e){var t=e.filter((function(e){var t,n;return!l.hideMinorTracks||(null===(t=!(null===(n=e.decoration)||void 0===n?void 0:n.minorTrack))||void 0===t||t)})).map((function(e){var t={client:e.source.client,date:e.source.date?Object(A.a)(e.source.date):null,structure:e.source.structure,version:e.source.version,clientVersion:e.source.client&&e.source.version?"".concat(e.source.client," ").concat(e.source.version):""};return Object.assign({},e,{source:t})}));c(t)}))}),[c,l.hideMinorTracks]),Object(M.jsx)(W.Provider,{value:i,children:t})},E=function(){var e=o.a.useContext(W);if(!e)throw new Error("useDataSourceState must be used within a DataSourceProvider");return e},R=n(247);!function(e){e.Korea="KMS",e.Japan="JMS",e.China="CMS",e.Taiwan="TMS",e.SEA="MSEA",e.Global="GMS",e.Thailand="ThMS",e.Brazil="BMS"}(F||(F={}));var G,I,U,H,J,V,Y,K,q,Q,$,X,Z,ee,te,ne,re,ae,oe,ie,ce,le,se,ue=n(89),de="#6495ed",be=function(e){return Object(M.jsx)("span",{children:Object(M.jsx)("img",{src:"mark/".concat(e.value,".png"),alt:"icon"})})},fe=function(e){var t=e.youtube,n=e.title;return""!==t?Object(j.c)("span",{children:[Object(j.b)(k.a,{delay:{show:250,hide:100},overlay:Object(j.b)(S.a,{id:"tooltip-ext-link",children:"View on YouTube"}),children:Object(j.b)("a",{css:Object(u.a)(G||(G=Object(l.a)(["\n            margin-right: 3px;\n          "]))),className:"bgm-external-link-icon",href:"https://youtu.be/".concat(t),rel:"noopener noreferrer",target:"_blank",onClick:function(){gtag("event","ce_view_external_video",{ce_category:"video",ce_youtube:e.youtube})},children:Object(j.b)("i",{className:"fa fa-external-link"})})}),Object(j.b)("a",{href:"# ",rel:"noopener noreferrer",onClick:function(t){gtag("event","ce_view_embedded_video",{ce_category:"video",ce_youtube:e.youtube}),e.onGridSongChange(e.youtube),t.preventDefault()},children:n})]}):Object(j.b)("span",{children:n})},he=n(255),ge=n(239),me=function(e){var t=e.value,n=new Date,r=Object(he.a)(n,t)<3||Object(ge.a)(t);return Object(j.c)("div",{className:"date-col",children:[Object(j.b)("span",{css:Object(u.a)(I||(I=Object(l.a)(["\n          margin-right: 3px;\n        "]))),children:e.valueFormatted}),!e.disableRecentTrack&&r&&Object(j.b)(k.a,{delay:{show:250,hide:100},overlay:Object(j.b)(S.a,{id:"tooltip-recent-track",children:"Recent Track"}),children:Object(j.b)("i",{className:"fa fa-star","aria-hidden":!0})})]})},pe=n(256),je=o.a.createContext(void 0),Oe=function(e){var t=e.children,n=o.a.useState(darkmode.inDarkMode),r=Object(s.a)(n,2),i=r[0],c=r[1];return Object(a.useEffect)((function(){var e=localStorage.getItem("bs.prefers-color-scheme");void 0!==e&&c("dark"===e)}),[]),Object(a.useEffect)((function(){var e=document.documentElement,t=new MutationObserver((function(e){var t=null===e||void 0===e?void 0:e[0].target;"dark"===t.className?c(!0):"light"===t.className&&c(!1)}));return t.observe(e,{attributes:!0}),function(){t.disconnect()}}),[]),Object(M.jsx)(je.Provider,{value:{darkMode:i},children:t})},ve=function(){var e=o.a.useContext(je);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},ye=function(e){return e?e.startsWith("en")?"en":e.startsWith("ko")?"ko":e.startsWith("ja")?"ja":"zh-CN"===e?"zh-CN":e.startsWith("zh")?"zh-TW":"en":"en"},Ce=function(e){var t=e.query,n=e.onGridSongChange,r=e.setPlaylistPool,o=e.locateSong,i=Object(pe.a)().i18n,c=E(),d=Object(a.useRef)(null),b=Object(a.useRef)(null),f=Object(a.useRef)([]),h=Object(a.useRef)(void 0),g=ve();f.current=function(e){return[{headerName:"",field:"mark",minWidth:70,maxWidth:70,resizable:!1,cellRendererFramework:be,getQuickFilterText:function(){return""}},{headerName:"Title",field:"metadata.title",minWidth:250,valueGetter:function(e){var t,n,r,a,o=e.context.i18n,i=e.data,c=ye(o.language);return"en"===c?i.metadata.title:null!==(t=null===(n=i.locale)||void 0===n||null===(r=n[c])||void 0===r||null===(a=r.metadata)||void 0===a?void 0:a.title)&&void 0!==t?t:i.metadata.title},cellRendererFramework:fe,cellRendererParams:function(t){return{title:t.value,youtube:t.data.youtube,onGridSongChange:e}}},{headerName:"Description",minWidth:375,field:"description",valueGetter:function(e){var t,n,r,a=e.context.i18n,o=e.data,i=ye(a.language);return"en"===i?o.description:null!==(t=null===(n=o.locale)||void 0===n||null===(r=n[i])||void 0===r?void 0:r.description)&&void 0!==t?t:o.description}},{headerName:"Folder",field:"source.structure",getQuickFilterText:function(){return""}},{headerName:"Date",field:"source.date",filter:"agDateColumnFilter",valueFormatter:function(e){return e.data.source.date?Object(R.a)(e.data.source.date,"yyyy-MM-dd"):""},cellRendererFramework:me,getQuickFilterText:function(){return""}},{headerName:"Client",field:"source.clientVersion",getQuickFilterText:function(){return""},cellStyle:function(e){if(!e.value)return{};var t=Object(ue.b)(de,.5);return{backgroundColor:e.value.startsWith(F.Korea)?t:Object(ue.a)(t)}}}]}(n),h.current={animateRows:!1,pagination:!0,paginationPageSize:25,suppressColumnVirtualisation:!0,suppressMovableColumns:!0,rowHeight:45,defaultColDef:{sortable:!0,filter:!0,resizable:!0},domLayout:"autoHeight"},Object(a.useEffect)((function(){var e;null===(e=d.current)||void 0===e||e.setQuickFilter(t)}),[t]),Object(a.useEffect)((function(){(null===o||void 0===o?void 0:o.songId)&&m(o.songId)}),[o]);var m=function(e){var t,n,r;if(e){var a=-1,o=[];if(null===(t=d.current)||void 0===t||t.forEachNodeAfterFilterAndSort((function(t,n){t.data.youtube===e&&(a=n,o.push(t))})),-1!==a&&1===o.length){var i=Math.ceil((a+1)/25)-1;null===(n=d.current)||void 0===n||n.paginationGoToPage(i),null===(r=d.current)||void 0===r||r.ensureIndexVisible(a,"middle"),o[0].setSelected(!0),setTimeout((function(){!function(e){var t;if(null!==e){var n=document.querySelector("div.ag-root-wrapper div[row-index='".concat(e,"']")),r=null===n||void 0===n?void 0:n.style.transform;if(r){var a=new RegExp(/^translateY\((\d+)px\)$/g).exec(r);if(a){var o=Object(s.a)(a,2)[1],i=null===(t=document.querySelector("div.ag-root-wrapper"))||void 0===t?void 0:t.offsetTop;if(void 0!==i){var c=i+Number(o);window.scrollTo({top:c,behavior:"smooth"})}}}}}(o[0].rowIndex)}),0)}}},p=function(e,t){var n,r=null!==(n=null===e||void 0===e?void 0:e.isAnyFilterPresent())&&void 0!==n&&n,a=[];null===e||void 0===e||e.forEachNodeAfterFilterAndSort((function(e){a.push(e.data)})),t(r,a)};Object(a.useEffect)((function(){p(d.current,r)}),[c,r]);var O={i18n:i};return Object(j.b)("div",{css:Object(u.a)(U||(U=Object(l.a)(["\n        margin: auto;\n        width: 95vw;\n        margin-bottom: 15px;\n      "]))),className:g.darkMode?"ag-theme-balham-dark":"ag-theme-balham",children:Object(j.b)(B.AgGridReact,{columnDefs:f.current,rowData:c,gridOptions:h.current,onFirstDataRendered:function(e){e.columnApi.autoSizeAllColumns()},onFilterChanged:function(e){p(e.api,r)},onSortChanged:function(e){p(e.api,r)},onModelUpdated:function(e){e.api.getDisplayedRowCount()>0?e.api.hideOverlay():e.api.showNoRowsOverlay()},onGridReady:function(e){d.current=e.api,b.current=e.columnApi;e.columnApi.applyColumnState({state:[{colId:"source.date",sort:"desc"}]})},reactUi:!0,context:O})})},ke=n(158),Se=n.n(ke),we=n(248),xe=n(240),Be=n(159),Ae=function(e){var t=Object(a.useRef)(null),n=e.playingState,r=e.setCurrentPlaylistSong;return Object(j.c)("div",{children:[Object(j.b)(Se.a,{css:Object(u.a)(H||(H=Object(l.a)(["\n          display: block;\n          margin-left: auto;\n          margin-right: auto;\n          max-width: 100vw;\n        "]))),ref:t,url:"https://youtu.be/".concat(n.currentSong),playing:!0,controls:!0,onEnded:function(){if(null!==t.current)if(n.currentPlaylist.length){var e;if(gtag("event","ce_complete_playlist_video",{ce_category:"video",ce_youtube:n.currentSong}),n.currentPlaylistSong===n.currentPlaylist.length-1){if(!n.repeatPlaylist)return;e=0}else e=n.currentPlaylistSong+1;r(e)}else t.current.seekTo(0),gtag("event","ce_loop_embedded_video",{ce_category:"video",ce_youtube:n.currentSong})}}),n.currentPlaylist.length>0&&Object(j.b)("div",{className:"text-center",css:Object(u.a)(J||(J=Object(l.a)(["\n            margin-top: 5px;\n          "]))),children:Object(j.c)(xe.a,{size:"sm",children:[Object(j.b)(Be.a,{variant:"outline-primary",onClick:function(){n.currentPlaylistSong<1||r(n.currentPlaylistSong-1)},disabled:0===n.currentPlaylistSong,children:Object(j.b)("i",{className:"fa fa-step-backward"})}),Object(j.b)("span",{css:Object(u.a)(V||(V=Object(l.a)(["\n                background-color: #343a40;\n                border-color: #343a40;\n                color: white;\n                padding: 0.25rem 0.5rem;\n                font-size: 0.875rem;\n                line-height: 1.5;\n                border: 1px solid transparent;\n                margin-left: -1px;\n              "]))),children:"".concat(Object(we.a)((n.currentPlaylistSong+1).toString(),n.currentPlaylist.length.toString().length,"0")," | ").concat(n.currentPlaylist.length)}),Object(j.b)(Be.a,{variant:"outline-primary",onClick:function(){n.currentPlaylistSong!==n.currentPlaylist.length-1&&r(n.currentPlaylistSong+1)},disabled:n.currentPlaylistSong+1===n.currentPlaylist.length,children:Object(j.b)("i",{className:"fa fa-step-forward"})})]})})]})},Me=function(){return Object(j.c)(a.Fragment,{children:[Object(j.b)("div",{children:Object(j.b)("img",{css:Object(u.a)(Y||(Y=Object(l.a)(["\n            display: block;\n            margin-left: auto;\n            margin-right: auto;\n            margin-bottom: 10px;\n          "]))),id:"header-logo",src:"assets/pink-bean.png",alt:"header logo"})}),Object(j.b)("div",{children:Object(j.b)("p",{children:"Welcome to the MapleStory Music database. This site provides a complete listing of the background music (BGM) used in MapleStory. Collectively, the songs are also known as MapleStory's original soundtrack (OST)."})})]})},Pe=function(e){var t=e.iconClass,n=e.actionName,r=e.onClick,a=e.active;return Object(j.b)(w.a.Item,{onClick:r,active:a,children:Object(j.c)("span",{children:[Object(j.b)("i",{className:t,css:Object(u.a)(K||(K=Object(l.a)(["\n            width: 24px;\n          "])))}),n]})})},Te=function(){var e=Object(a.useState)(),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(!1),i=Object(s.a)(o,2),c=i[0],d=i[1],b=Object(a.useState)(!1),f=Object(s.a)(b,2),h=f[0],g=f[1],m=Object(a.useState)({currentSong:void 0,currentPlaylist:[],currentPlaylistSong:-1,repeatPlaylist:!1}),p=Object(s.a)(m,2),O=p[0],B=p[1],A=Object(a.useRef)([]),M=Object(a.useState)(),P=Object(s.a)(M,2),T=P[0],D=P[1],N=Object(a.useCallback)((function(e,t){d(e),A.current=t}),[]);return Object(j.c)("div",{children:[void 0===O.currentSong?Object(j.b)(Me,{}):Object(j.b)(Ae,{playingState:O,setCurrentPlaylistSong:function(e){B((function(t){return Object(v.a)(Object(v.a)({},t),{},{currentSong:t.currentPlaylist[e].youtube,currentPlaylistSong:e})}))}}),Object(j.b)(y.a.Group,{css:Object(u.a)(q||(q=Object(l.a)(["\n          margin: 10px 14vw;\n        "]))),className:"filter-text",children:Object(j.c)(C.a,{size:"lg",children:[Object(j.b)(k.a,{delay:{show:250,hide:100},overlay:Object(j.b)(S.a,{id:"tooltip-locate-song",children:"Locate Current Song"}),children:Object(j.b)(C.a.Text,{css:Object(u.a)(Q||(Q=Object(l.a)(["\n                cursor: pointer;\n              "]))),onClick:function(){D({songId:O.currentSong})},children:Object(j.b)("i",{className:"fa fa-search"})})}),Object(j.b)(y.a.Control,{type:"search",placeholder:"Song title or keyword",onChange:function(e){r(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&document.activeElement&&document.activeElement.blur()}}),Object(j.c)(w.a,{children:[Object(j.b)(k.a,{delay:{show:250,hide:100},overlay:Object(j.b)(S.a,{id:"tooltip-playlist-actions",children:c?"Playlist Actions (Filtered)":"Playlist Actions"}),children:Object(j.b)(w.a.Toggle,{variant:c?"outline-warning":"outline-success",id:"dropdown-playlist-actions",children:Object(j.b)("i",{className:"fa fa-play"})})}),Object(j.c)(w.a.Menu,{children:[Object(j.b)(Pe,{actionName:"Start Playlist",iconClass:"fa fa-play",onClick:function(){var e=A.current.filter((function(e){return""!==e.youtube}));e.length&&(B({currentSong:e[0].youtube,currentPlaylist:e,currentPlaylistSong:0,repeatPlaylist:h}),gtag("event","ce_start_playlist",{ce_category:"playlist",ce_source:"play_button",ce_filtered:c}))}}),Object(j.b)(Pe,{actionName:"Start Shuffled Playlist",iconClass:"fa fa-random",onClick:function(){var e=Object(x.a)(A.current.filter((function(e){return""!==e.youtube})));e.length&&(B({currentSong:e[0].youtube,currentPlaylist:e,currentPlaylistSong:0,repeatPlaylist:h}),gtag("event","ce_start_shuffled_playlist",{ce_category:"playlist",ce_source:"shuffle_button",ce_filtered:c}))}}),Object(j.b)(w.a.Divider,{}),Object(j.b)(Pe,{actionName:h?"Turn Off Playlist Repeat":"Turn On Playlist Repeat",iconClass:"fa fa-repeat",onClick:function(){var e=!h;g(e),B((function(t){return Object(v.a)(Object(v.a)({},t),{},{repeatPlaylist:e})}))},active:h})]})]})]})}),Object(j.b)(Ce,{query:n,onGridSongChange:function(e){B({currentSong:e,currentPlaylist:[],currentPlaylistSong:-1,repeatPlaylist:h})},setPlaylistPool:N,locateSong:T})]})},De=n(243),Ne=n(242),Fe=n(163),ze=n.n(Fe),_e=n(164),We=n.n(_e),Le={colors:["#8087E8","#A3EDBA","#F19E53","#6699A1","#E1D369","#87B4E7","#DA6D85","#BBBAC5"],chart:{backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#1f1836"],[1,"#45445d"]]},style:{fontFamily:"IBM Plex Sans, sans-serif"}},title:{style:{fontSize:"22px",fontWeight:"500",color:"#fff"}},subtitle:{style:{fontSize:"16px",fontWeight:"400",color:"#fff"}},credits:{style:{color:"#f0f0f0"}},caption:{style:{color:"#f0f0f0"}},tooltip:{borderWidth:0,backgroundColor:"#000000",style:{color:"#f0f0f0"},shadow:!0},legend:{backgroundColor:"transparent",itemStyle:{fontWeight:"400",fontSize:"12px",color:"#fff"},itemHoverStyle:{fontWeight:"700",color:"#fff"}},labels:{style:{color:"#707073"}},plotOptions:{series:{dataLabels:{color:"#46465C",style:{fontSize:"13px"}},marker:{lineColor:"#333"}},boxplot:{fillColor:"#505053"},candlestick:{lineColor:null,upColor:"#DA6D85",upLineColor:"#DA6D85"},errorbar:{color:"white"},dumbbell:{lowColor:"#f0f0f0"},map:{borderColor:"rgba(200, 200, 200, 1)",nullColor:"#78758C"}},drilldown:{activeAxisLabelStyle:{color:"#F0F0F3"},activeDataLabelStyle:{color:"#F0F0F3"},drillUpButton:{theme:{fill:"#fff"}}},xAxis:{gridLineColor:"#707073",labels:{style:{color:"#fff",fontSize:"12px"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",title:{style:{color:"#fff"}}},yAxis:{gridLineColor:"#707073",labels:{style:{color:"#fff",fontSize:"12px"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",tickWidth:1,title:{style:{color:"#fff",fontWeight:"300"}}},mapNavigation:{enabled:!0,buttonOptions:{theme:{fill:"#46465C","stroke-width":1,stroke:"#BBBAC5",r:2,style:{color:"#fff"},states:{hover:{fill:"#000","stroke-width":1,stroke:"#f0f0f0",style:{color:"#fff"}},select:{fill:"#000","stroke-width":1,stroke:"#f0f0f0",style:{color:"#fff"}}}},verticalAlign:"bottom"}},rangeSelector:{buttonTheme:{fill:"#46465C",stroke:"#BBBAC5","stroke-width":1,style:{color:"#fff"},states:{hover:{fill:"#1f1836",style:{color:"#fff"},"stroke-width":1,stroke:"white"},select:{fill:"#1f1836",style:{color:"#fff"},"stroke-width":1,stroke:"white"}}},inputBoxBorderColor:"#BBBAC5",inputStyle:{backgroundColor:"#2F2B38",color:"#fff"},labelStyle:{color:"#fff"}},navigator:{handles:{backgroundColor:"#BBBAC5",borderColor:"#2F2B38"},outlineColor:"#CCC",maskFill:"rgba(255,255,255,0.1)",series:{color:"#A3EDBA",lineColor:"#A3EDBA"},xAxis:{gridLineColor:"#505053"}},scrollbar:{barBackgroundColor:"#BBBAC5",barBorderColor:"#808083",buttonArrowColor:"#2F2B38",buttonBackgroundColor:"#BBBAC5",buttonBorderColor:"#2F2B38",rifleColor:"#2F2B38",trackBackgroundColor:"#78758C",trackBorderColor:"#2F2B38"}},Ee={colors:["#8087E8","#A3EDBA","#F19E53","#6699A1","#E1D369","#87B4E7","#DA6D85","#BBBAC5"],chart:{backgroundColor:"#f0f0f0",style:{fontFamily:"IBM Plex Sans, sans-serif"}},title:{style:{fontSize:"22px",fontWeight:"500",color:"#2F2B38"}},subtitle:{style:{fontSize:"16px",fontWeight:"400",color:"#2F2B38"}},tooltip:{borderWidth:0,backgroundColor:"#46465C",style:{color:"#f0f0f0"},shadow:!0},legend:{backgroundColor:"#f0f0f0",borderColor:"#BBBAC5",borderWidth:1,borderRadius:2,itemStyle:{fontWeight:"400",fontSize:"12px",color:"#2F2B38"},itemHoverStyle:{fontWeight:"700",color:"#46465C"}},navigation:{buttonOptions:{symbolStroke:"#2F2B38",theme:{fill:"#fff",states:{hover:{stroke:"#46465C",fill:"#fff"},select:{stroke:"#46465C",fill:"#fff"}}}}},labels:{style:{color:"#46465C"}},credits:{style:{color:"#46465C"}},drilldown:{activeAxisLabelStyle:{color:"#2F2B38"},activeDataLabelStyle:{color:"#2F2B38"},drillUpButton:{theme:{fill:"#2F2B38",style:{color:"#fff"}}}},xAxis:{gridLineColor:"#ccc",labels:{style:{color:"#46465C",fontSize:"12px"}},lineColor:"#ccc",minorGridLineColor:"#ebebeb",tickColor:"#ccc",title:{style:{color:"#2F2B38"}}},yAxis:{gridLineColor:"#ccc",labels:{style:{color:"#46465C",fontSize:"12px"}},lineColor:"#ccc",minorGridLineColor:"#ebebeb",tickColor:"#ccc",tickWidth:1,title:{style:{color:"#2F2B38",fontWeight:"300"}}},rangeSelector:{buttonTheme:{fill:"#fff",style:{color:"#46465C",stroke:"transparent"},states:{hover:{fill:"#fff",style:{color:"#46465C"},"stroke-width":1,stroke:"#46465C"},select:{fill:"#fff",style:{color:"#46465C"},"stroke-width":1,stroke:"#46465C"}}},inputBoxBorderColor:"#BBBAC5",inputStyle:{backgroundColor:"#fff",color:"#46465C"},labelStyle:{color:"#46465C"}},scrollbar:{barBackgroundColor:"#BBBAC5",barBorderColor:"#808083",buttonArrowColor:"#fff",buttonBackgroundColor:"#BBBAC5",buttonBorderColor:"#46465C",rifleColor:"#FFF",trackBackgroundColor:"#dedede",trackBorderColor:"#BBBAC5"},plotOptions:{series:{borderWidth:1,borderColor:"#BBBAC5",dataLabels:{color:"#46465C",style:{fontSize:"13px"}},marker:{lineColor:"#46465C"}},boxplot:{fillColor:"#505053"},candlestick:{lineColor:null,upColor:"#DA6D85",upLineColor:"#DA6D85"},errorbar:{color:"white"},map:{borderColor:"rgba(200, 200, 200, 0.3)",nullColor:"rgba(200, 200, 200, 0.3)"}}},Re=function(e){var t=ve();return Object(a.useEffect)((function(){var n,r,a=t.darkMode?Le:Ee,o=Object(v.a)(Object(v.a)({},e.options),a);null===(n=e.chartComponent.current)||void 0===n||null===(r=n.chart)||void 0===r||r.update(o)}),[e.chartComponent,e.options,t]),Object(j.b)("div",{css:[Object(u.a)($||($=Object(l.a)(["\n          display: inline-block;\n          margin: 10px;\n          @media (max-width: 1024px) {\n            width: 100%;\n          }\n        "]))),e.styles],children:Object(j.b)(We.a,{containerProps:{className:"react-highcharts-container",style:{width:"100%",height:"100%"}},highcharts:ze.a,options:e.options,ref:e.chartComponent})})},Ge=function(e,t){var n=Date.now(),r=Object(Ne.a)(n)+1;return t===Object(De.a)(n)?e.slice(0,1===r?r+1:r):e},Ie=function(e){var t=Object(a.useRef)(null),n=E(),r=e.selectedYear,o=n.reduce((function(e,t){return t.metadata.year===r.toString()&&t.source.date&&e[Object(Ne.a)(t.source.date)]++,e}),new Array(12).fill(0)),i=o.reduce((function(e,t,n){return 0===n?e[0]=t:e[n]=e[n-1]+t,e}),new Array(12).fill(0)),c={chart:{type:"line"},title:{text:"Song frequency per month"},xAxis:{type:"datetime"},yAxis:[{title:{text:"Songs"},allowDecimals:!1},{title:{text:"Cumulative"},allowDecimals:!1,opposite:!0}],series:[{name:"Songs",type:"line",yAxis:0,pointStart:Date.UTC(r,0,1),pointIntervalUnit:"month",data:Ge(o,r)},{name:"Cumulative",type:"line",yAxis:1,pointStart:Date.UTC(r,0,1),pointIntervalUnit:"month",data:Ge(i,r)}]};return Object(j.b)(Re,{styles:Object(u.a)(X||(X=Object(l.a)(["\n        width: 55vw;\n        flex: 2;\n      "]))),options:c,chartComponent:t})},Ue=function(e){var t=Object(a.useRef)(null),n=E(),r=e.selectedYear,o=n.filter((function(e){var t;return(null===(t=e.source.date)||void 0===t?void 0:t.getFullYear())===r&&e.source.client})),i=function(e){return o.filter((function(t){var n;return null===(n=t.source.client)||void 0===n?void 0:n.includes(e)})).length},c=i(F.Korea),s=o.length-c,d={chart:{type:"pie"},title:{text:"Distribution of song region"},series:[{id:"domesticVsOverseas",name:"Total Songs",type:"pie",data:[{name:"Domestic",color:de,y:c},{name:"Overseas",color:Object(ue.a)(de),y:s}],size:"70%",dataLabels:{enabled:!1}},{id:"regional",name:"Songs",type:"pie",data:[{name:"Korea",color:de,y:c},{name:"Japan",y:i(F.Japan)},{name:"China",y:i(F.China)},{name:"Taiwan",y:i(F.Taiwan)},{name:"Thailand",y:i(F.Thailand)},{name:"SEA",y:i(F.SEA)},{name:"Global",y:i(F.Global)},{name:"Brazil",y:i(F.Brazil)}],size:"100%",innerSize:"70%",dataLabels:{formatter:function(e){if(this.y)return this.key}}}]};return Object(j.b)(Re,{styles:Object(u.a)(Z||(Z=Object(l.a)(["\n        width: 35vw;\n        flex: 1;\n      "]))),options:d,chartComponent:t})},He=n(44),Je=n(78),Ve=n(246),Ye=function(){var e=ve(),t=E(),n=Object(a.useRef)(null),r=Object(a.useRef)(null),o=Object(a.useRef)([{headerName:"",field:"mark",minWidth:70,maxWidth:70,resizable:!1,cellRendererFramework:be},{headerName:"Folder",field:"folderName"},{headerName:"Creation",field:"creationDate",initialWidth:145,cellRendererFramework:me,cellRendererParams:{disableRecentTrack:!0},filter:"agDateColumnFilter",valueFormatter:function(e){return Number.isNaN(e.data.creationDate.valueOf())?"":Object(R.a)(e.data.creationDate,"yyyy-MM-dd")}},{headerName:"Last Update",field:"lastUpdate",initialWidth:145,cellRendererFramework:me,cellRendererParams:{disableRecentTrack:!0},filter:"agDateColumnFilter",valueFormatter:function(e){return Number.isNaN(e.data.lastUpdate.valueOf())?"":Object(R.a)(e.data.lastUpdate,"yyyy-MM-dd")}},{headerName:"Track Count",field:"trackCount",initialWidth:110}]),i=Object(a.useRef)({animateRows:!1,pagination:!0,paginationPageSize:10,suppressColumnVirtualisation:!0,suppressMovableColumns:!0,rowHeight:45,defaultColDef:{sortable:!0,filter:!0,resizable:!0},domLayout:"autoHeight"}),c=Object(a.useMemo)((function(){var e,n=new Map,r=Object(Je.a)(t);try{for(r.s();!(e=r.n()).done;){var a=e.value,o=a.source.structure,i=n.get(o);i?n.set(o,[].concat(Object(He.a)(i),[a])):n.set(o,[a])}}catch(c){r.e(c)}finally{r.f()}return Array.from(n.entries()).reduce((function(e,t){var n=Object(s.a)(t,2),r=n[0],a=n[1],o=a.map((function(e){var t,n;return null!==(t=null===(n=e.source.date)||void 0===n?void 0:n.valueOf())&&void 0!==t?t:-1})).filter((function(e){return-1!==e})),i=Object.entries(Object(Ve.a)(a.map((function(e){return e.mark})))).sort((function(e,t){return t[1]-e[1]})),c={folderName:r,trackCount:a.length,mark:i[0][0],creationDate:new Date(o.sort((function(e,t){return e-t}))[0]),lastUpdate:new Date(o.sort((function(e,t){return t-e}))[0])};return e.push(c),e}),[])}),[t]);return Object(M.jsx)("div",{className:e.darkMode?"ag-theme-balham-dark":"ag-theme-balham",children:Object(M.jsx)(B.AgGridReact,{columnDefs:o.current,rowData:c,gridOptions:i.current,onGridReady:function(e){n.current=e.api,r.current=e.columnApi;e.columnApi.applyColumnState({state:[{colId:"lastUpdate",sort:"desc"}]})},reactUi:!0})})},Ke=function(){var e=Object(De.a)(new Date),t=Object(a.useState)(e),n=Object(s.a)(t,2),r=n[0],o=n[1],i=Array(Object(De.a)(new Date)-2003+1).fill(0).map((function(e,t){return 2003+t}));return Object(j.c)("div",{children:[Object(j.b)("h2",{children:"Stats"}),Object(j.b)(y.a,{children:Object(j.b)(y.a.Group,{controlId:"year-select",children:Object(j.b)(y.a.Select,{css:Object(u.a)(ee||(ee=Object(l.a)(["\n              width: 100px;\n            "]))),defaultValue:e,onChange:function(e){e.target.value&&o(+e.target.value)},children:i.map((function(e){return Object(j.b)("option",{value:e,children:e},e)}))})})}),Object(j.c)("div",{css:Object(u.a)(te||(te=Object(l.a)(["\n          display: flex;\n          align-items: center;\n          flex-direction: row;\n          flex-wrap: wrap;\n        "]))),children:[Object(j.b)(Ie,{selectedYear:r}),Object(j.b)(Ue,{selectedYear:r})]}),Object(j.b)("div",{children:Object(j.b)(Ye,{})})]})},qe=n(245),Qe=n(252),$e=function(e){var t=e.show,n=e.onModalClose,r=_(),o=r.settings,i=r.setSettings,c=Object(a.useState)(o.hideMinorTracks),d=Object(s.a)(c,2),b=d[0],f=d[1];return Object(j.c)(Qe.a,{show:t,onShow:function(){f(o.hideMinorTracks)},onHide:n,children:[Object(j.b)(Qe.a.Header,{closeButton:!0,children:Object(j.b)(Qe.a.Title,{children:"Settings"})}),Object(j.b)(Qe.a.Body,{children:Object(j.b)(y.a,{children:Object(j.b)(j.a,{children:Object(j.c)("div",{css:Object(u.a)(ne||(ne=Object(l.a)(["\n                display: flex;\n                align-items: center;\n              "]))),children:[Object(j.b)(y.a.Check,{type:"switch",id:"minorTrack-switch",label:"Hide Minor Tracks",checked:b,onChange:function(){f((function(e){return!e}))}}),Object(j.b)(k.a,{delay:{show:250,hide:100},placement:"right",overlay:Object(j.b)(S.a,{id:"tooltip-minorTrack",children:"Minor tracks feature segments of another song"}),children:Object(j.b)("i",{css:Object(u.a)(re||(re=Object(l.a)(["\n                    margin: 0 4px;\n                  "]))),className:"fa fa-question-circle","aria-hidden":!0})})]})})})}),Object(j.b)(Qe.a.Footer,{children:Object(j.b)(Be.a,{variant:"primary",onClick:function(){i({hideMinorTracks:b}),n()},children:"Save"})})]})},Xe=Object(f.a)(),Ze=function(e){e.currentTarget.pathname===window.location.pathname&&e.preventDefault()},et=function(){var e,t,n,r=Object(pe.a)().i18n,o=ve(),i=Object(a.useState)(!1),c=Object(s.a)(i,2),b=c[0],f=c[1];return Object(j.c)(j.a,{children:[Object(j.c)(h.a,{css:Object(u.a)(ae||(ae=Object(l.a)(["\n          margin-bottom: 10px;\n        "]))),bg:"dark",variant:"dark",expand:"lg",children:[Object(j.c)(h.a.Brand,{css:Object(u.a)(oe||(oe=Object(l.a)(["\n            margin-left: 1rem;\n          "]))),as:d.a,to:"/",onClick:Ze,children:[Object(j.b)("img",{css:Object(u.a)(ie||(ie=Object(l.a)(["\n              margin-right: 8px;\n            "]))),alt:"",src:"./assets/pb-logo.svg",width:"30",height:"30",className:"d-inline-block align-top"})," ","MapleStory Music"]}),Object(j.b)(h.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(j.b)(h.a.Collapse,{id:"basic-navbar-nav",children:Object(j.c)(g.a,{className:"mr-auto",children:[Object(j.b)(g.a.Link,{as:d.b,exact:!0,to:"/",onClick:Ze,children:"Home"}),Object(j.b)(g.a.Link,{as:d.b,exact:!0,to:"/stats",onClick:Ze,children:"Stats"}),Object(j.b)(g.a.Link,{as:d.b,exact:!0,to:"/about",onClick:Ze,children:"About"}),Object(j.c)(m.a,{title:"Theme",children:[Object(j.b)(m.a.Item,{active:!o.darkMode,onClick:function(){o.darkMode&&(darkmode.setDarkMode(!1),gtag("event","ce_ui_light",{ce_category:"ui",ce_source:"navbar"}))},children:"Light"}),Object(j.b)(m.a.Item,{active:o.darkMode,onClick:function(){o.darkMode||(darkmode.setDarkMode(!0),gtag("event","ce_ui_dark",{ce_category:"ui",ce_source:"navbar"}))},children:"Dark"})]}),Object(j.c)(m.a,{title:"Language",children:[Object(j.b)(m.a.Item,{active:null===(e=r.language)||void 0===e?void 0:e.startsWith("en"),onClick:function(){return r.changeLanguage("en")},children:"English"}),Object(j.b)(m.a.Item,{active:null===(t=r.language)||void 0===t?void 0:t.startsWith("ko"),onClick:function(){return r.changeLanguage("ko")},children:"Korean"}),Object(j.b)(m.a.Item,{active:null===(n=r.language)||void 0===n?void 0:n.startsWith("ja"),onClick:function(){return r.changeLanguage("ja")},children:"Japanese"}),Object(j.b)(m.a.Item,{active:"zh-CN"===r.language,onClick:function(){return r.changeLanguage("zh-CN")},children:"Chinese (Simplified)"}),Object(j.b)(m.a.Item,{active:"zh-TW"===r.language,onClick:function(){return r.changeLanguage("zh-TW")},children:"Chinese (Traditional)"})]}),Object(j.b)(g.a.Link,{as:d.b,to:"#",onClick:function(){return f(!0)},children:"\u2699\ufe0f"})]})})]}),Object(j.b)($e,{show:b,onModalClose:function(){return f(!1)}})]})},tt=function(){var e,t,n=null!==(e="835f494")?e:"Dev",r=null!==(t="2023-07-16")?t:Object(qe.a)(new Date,{representation:"date"});return Object(j.b)("div",{css:Object(u.a)(ce||(ce=Object(l.a)(["\n        text-align: center;\n        margin-bottom: 10px;\n      "]))),className:"footer",children:Object(j.b)("span",{children:"Build: ".concat(n," (").concat(r,")")})})},nt="MapleStory Music - BGM & OST Database",rt={"/":nt,"/stats":"".concat(nt," - Stats"),"/about":"".concat(nt," - About")},at=function(){var e=Object(b.f)();return Object(a.useEffect)((function(){var t;document.title=null!==(t=rt[e.pathname])&&void 0!==t?t:nt}),[e]),Object(j.b)("main",{children:Object(j.c)(b.c,{children:[Object(j.b)(b.a,{exact:!0,path:"/",component:ot}),Object(j.b)(b.a,{path:"/stats",component:ct}),Object(j.b)(b.a,{path:"/about",component:it})]})})},ot=function(){return Object(j.b)("div",{className:"App",children:Object(j.b)(Te,{})})},it=function(){return Object(j.b)("div",{css:Object(u.a)(le||(le=Object(l.a)(["\n      margin: 2% 3% 3% 3%;\n    "]))),className:"About",children:Object(j.b)(O,{})})},ct=function(){return Object(j.b)("div",{css:Object(u.a)(se||(se=Object(l.a)(["\n      margin: 2% 3% 1% 3%;\n    "]))),className:"Stats",children:Object(j.b)(Ke,{})})},lt=function(){return Object(j.b)(Oe,{children:Object(j.b)(z,{children:Object(j.b)(L,{children:Object(j.b)(b.b,{history:Xe,children:Object(j.c)("div",{children:[Object(j.b)(et,{}),Object(j.b)(at,{}),Object(j.b)(tt,{})]})})})})})},st=n(166),ut=n(92),dt=n(167);st.a.use(dt.a).use(ut.e).init({fallbackLng:{zh:["zh-TW","zh-CN","en"],default:["en"]},nonExplicitSupportedLngs:!0,supportedLngs:["en","ko","ja","zh"]});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(M.jsx)(o.a.StrictMode,{children:Object(M.jsx)(a.Suspense,{fallback:Object(M.jsx)("div",{children:"Loading..."}),children:Object(M.jsx)(lt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[231,1,2]]]);