KISSY.add("utils/showPages/index",function(a){function e(a){var b=this;if(!(b instanceof e))return new e(a);this.pageNum=4,this.name=a,this.page=1,this.pageCount=200,this.argName="page"}var b=a.DOM,c=a.Event,d=document;return a.mix(e.prototype,{jump:function(){return undefined},checkPages:function(){isNaN(parseInt(this.page))&&(this.page=1),isNaN(parseInt(this.pageCount))&&(this.pageCount=1),this.page<1&&(this.page=1),this.pageCount<1&&(this.pageCount=1),this.page>this.pageCount&&(this.page=this.pageCount),this.page=parseInt(this.page),this.pageCount=parseInt(this.pageCount)},_createHtml:function(a){var b=this,c="",d=this.page-1,e=this.page+1;if(a==""||typeof a=="undefined")a=1;switch(a){case 1:c+='<span class="number">',this.page!=1&&(c+='<span title="Page 1"><a href="javascript:'+b.name+'.toPage(1);">1</a></span>'),this.page>=5&&(c+="<span>...</span>");if(this.pageCount>this.page+2)var f=this.page+2;else var f=this.pageCount;for(var g=this.page-2;g<=f;g++)g>0&&(g==this.page?c+='<span title="Page '+g+'">'+g+"</span>":g!=1&&g!=this.pageCount&&(c+='<span title="Page '+g+'"><a href="javascript:'+b.name+".toPage("+g+');">'+g+"</a></span>"));this.page+3<this.pageCount&&(c+="<span>...</span>"),this.page!=this.pageCount&&(c+='<span title="Page '+this.pageCount+'"><a href="javascript:'+b.name+".toPage("+this.pageCount+');">'+this.pageCount+"</a></span>"),c+="</span><br />";break;case 2:if(this.pageCount>1){c+='<div class="page-bottom"> <div class="sabrosus">',d<1?c+='<span class="pre-none page-pic-no"></span>':c+='<a class="" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',this.page==1;if(this.page-2<=0){var h=1;if(this.pageCount>this.page+4)var f=this.page+4;else var f=this.pageCount}else if(this.page+2>=this.pageCount){var h=this.pageCount-4;if(this.pageCount>this.page+4)var f=this.page+4;else var f=this.pageCount}else{var h=this.page-2;if(this.pageCount>this.page+2)var f=this.page+2;else var f=this.pageCount}for(var g=h;g<=f;g++)g>0&&(g==this.page?c+='<span class="current a-padding">'+g+"</span>":c+='<a class="a-padding" href="javascript:'+b.name+".toPage("+g+');">'+g+"</a>");this.page+5<this.pageCount&&(c+='<a class="a-padding" title="" href="javascript:'+b.name+".toPage("+(this.page+3)+');">...</a>'),this.page==this.pageCount,e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a class="" href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',this.pageCount>5&&(c+='<font class="number">',c+="\u5171"+this.pageCount+"\u9875&nbsp;\u5230\u7b2c&nbsp;",this.page>=this.pageCount?c+='<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput'+b.name+'"  value="'+this.pageCount+'" onkeypress="return window.'+b.name+'.formatInputPage(event);" onfocus="this.select()">&nbsp;\u9875':c+='<input style="" type="text" class="page-pic-no w-30 bg-img" id="pageInput'+b.name+'"  value="'+(this.page+1)+'" onkeypress="return window.'+b.name+'.formatInputPage(event);" onfocus="this.select()">&nbsp;\u9875',c+='<input type="button" value="" class="page-pic-no gray-btm-h-go w-30 btm-go" onclick="javascript:var page = document.getElementById(\'pageInput'+b.name+"').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>"+this.pageCount+"){ var turnTo = "+this.pageCount+";} else{var turnTo = page;}  window."+b.name+'.toPage(turnTo);">',c+="</font>"),c+='<div style="clear:both"></div></div></div> '}break;case 3:c+='<div class="page-top"><div class="sabrosus"><span class="count">'+this.page+" / "+this.pageCount+"</span>",d<1?c+=' <span class="pre-none page-pic-no"></span>':c+='<a class="border-left-dedede" href="javascript:'+b.name+".toPage("+d+');" title="\u4e0a\u4e00\u9875"><span class="pre page-pic-no"></span></a>',e>this.pageCount?c+='<span class="next-none page-pic-no"></span>':c+='<a href="javascript:'+b.name+".toPage("+e+');" title="\u4e0b\u4e00\u9875"><span class="next page-pic-no"></span></a>',c+='<div style="clear:both"></div></div></div>'}return c},formatInputPage:function(a){var b=navigator.appName=="Microsoft Internet Explorer"?!0:!1;if(!b)var c=a.which;else var c=event.keyCode;return c==8||c==46||c>=48&&c<=57?!0:!1},toPage:function(a,b){var c=1,d=this;typeof a=="object"?c=a.options[a.selectedIndex].value:c=a,d.jump(c,b,"")},printHtml:function(a,c){return this.checkPages(),b.html(a,this._createHtml(c)),this},setPageCount:function(a){return this.pageCount=a,this},getPageCount:function(){return this.pageCount},setRender:function(a){return this.jump=a,this},setPageNum:function(a){return this.pageNum=a,this},setPage:function(a){return this.page=a,this}}),e}),KISSY.add("page/item-init",function(S,showPages){var DOM=S.DOM,Event=S.Event;return itemControl={paginator:null,listItemsPaginator:null,msg:null,isTarget:!1,init:function(){var a=null;Event.delegate(document,"click dblclick",".J_TopAddToPromo",function(b){var c=DOM.attr(b.currentTarget,"data");b.type=="click"&&(clearTimeout(a),a=setTimeout(function(){c=="1"?itemControl.addItems():itemControl.batchAddItems()},300)),b.type=="dblclick"&&(clearTimeout(a),c=="1"?itemControl.addItems():itemControl.batchAddItems())});var b=KISSY.Node.all;window.onscroll=function(){var a=DOM.offset("#J_main").top+125,c=b(window).scrollTop();c>a?(DOM.addClass("#J_LeftOpertion","fix-top"),DOM.addClass("#J_RightOpertion","fix-top")):(DOM.removeClass("#J_LeftOpertion","fix-top"),DOM.removeClass("#J_RightOpertion","fix-top"))},Event.on("#J_TopCheckAll","click",itemControl.checkAll),Event.on("#J_RightCheckAll","click",itemControl.rightCheckAll),Event.on("#J_RemoveItems","click",itemControl.removeItems),Event.on("#J_RightSearchBtn","click",itemControl.loadItems),Event.on("#J_BatchRetry","click",itemControl.batchRetry);if(DOM.hasClass("#body-html","w-1000")){var c='<select id="J_SelectItemPage" name="Page"><option selected="selected" value="10">10\u6761</option><option value="20">20\u6761</option><option value="30">30\u6761</option><option value="40">40\u6761</option><option value="50">50\u6761</option><option value="100">100\u6761</option></select>';DOM.html("#J_SelectPage",c)}else{var c='<select id="J_SelectItemPage" name="Page"><option selected="selected" value="12">12\u6761</option><option value="24">24\u6761</option><option value="36">36\u6761</option><option value="48">48\u6761</option><option value="60">60\u6761</option></select>';DOM.html("#J_SelectPage",c)}},checkAll:function(a){checkBoxs=DOM.query("#J_TbItemList .J_CheckBox"),len=checkBoxs.length;for(i=0;i<len;i++){var b=checkBoxs[i].value;if(checkBoxs[i].disabled)continue;this.checked?(checkBoxs[i].checked=!0,DOM.addClass("#J_TbItem_"+b,"selected")):(DOM.removeClass("#J_TbItem_"+b,"selected"),checkBoxs[i].checked=!1)}},hasItems:function(){checkBoxs=DOM.query("#J_TbItemList .J_CheckBox");var a=checkBoxs.length,b=!1;for(i=0;i<a;i++)if(checkBoxs[i].checked&&!checkBoxs[i].disabled){b=!0;break}return b},addItems:function(){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;DOM.attr("#J_TopAddItems","disabled",!0),DOM.replaceClass("#J_TopAddItems","btm-caozuo-orange","btm-caozuo-gray-none"),checkBoxs=DOM.query("#J_TbItemList .J_CheckBox");var json=[],itemXml="",len=checkBoxs.length,error=!1;for(i=0;i<len;i++)if(checkBoxs[i].checked&&!checkBoxs[i].disabled){var id=checkBoxs[i].value,title=H.util.strProcess(DOM.val(DOM.get("#J_ItemTitle_"+id))),price=DOM.val(DOM.get("#J_ItemPrice_"+id)),picUrl=DOM.val(DOM.get("#J_ItemPic_"+id)),outId=H.util.strProcess(DOM.val(DOM.get("#J_ItemOuterId_"+id)));o='{"id":"'+id+'", "outer_id":"'+outId+'", "title":"'+title+'", "price":"'+price+'", "pic_url":"'+picUrl+'"}',o=eval("("+o+")"),json.push(o)}if(json.length==0){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:"\u672a\u9009\u62e9\u4efb\u4f55\u5b9d\u8d1d",autoClose:!0,timeOut:1e3}),DOM.attr("#J_TopAddItems","disabled",!1),DOM.replaceClass("#J_TopAddItems","btm-caozuo-gray-none","btm-caozuo-orange");return}var itemsJson=KISSY.JSON.stringify(json),submitHandle=function(a){DOM.attr("#J_TopAddItems","disabled",!1),DOM.replaceClass("#J_TopAddItems","btm-caozuo-gray-none","btm-caozuo-orange"),a.payload.limit!=null&&new H.widget.msgBox({title:"\u64cd\u4f5c\u5931\u8d25",content:a.payload.limit,type:"error"}),new H.widget.msgBox({type:"sucess",dialogType:"msg",content:"\u5b9d\u8d1d\u6210\u529f\u52a0\u5165\u6d3b\u52a8",autoClose:!0,timeOut:2e3}),itemControl.paginator?itemControl.paginator.toPage(itemControl.paginator.page):itemControl.searchTbItems()},errorHandle=function(a){DOM.attr("#J_TopAddItems","disabled",!1),DOM.replaceClass("#J_TopAddItems","btm-caozuo-gray-none","btm-caozuo-orange"),new H.widget.msgBox({type:"error",content:a.desc})},data="id="+listId+"&items="+itemsJson+"&form_key="+FORM_KEY;(new H.widget.asyncRequest).setURI(addItemsUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send()},batchAddItems:function(){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;var a=function(a){itemControl.msg.hide(),new H.widget.msgBox({type:"sucess",dialogType:"msg",content:"\u64cd\u4f5c\u6210\u529f",autoClose:!0,timeOut:2e3}),S.later(function(){window.location.reload()},1e3,!1,null,null)},b="&id="+listId,c=DOM.val(DOM.get("#J_SelectItemCid"));if(DOM.val(DOM.get("#J_SearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var d=encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle")));else var d="";var e=DOM.val(DOM.get("#J_SearchSelling"));b+="&title="+d+"&cid="+c+"&type="+e;var f=DOM.val(DOM.get("#J_StartPrice")),g=DOM.val(DOM.get("#J_EndPrice"));b+="&start_price="+f+"&end_price="+g,DOM.attr("#J_TopBatchAddItems","disabled",!0),DOM.replaceClass("#J_TopBatchAddItems","btm-80-gray","btm-80-gray-none"),itemControl.msg=new H.widget.msgBox({dialogType:"loading",content:"\u7cfb\u7edf\u6b63\u5728\u5904\u7406\uff0c\u8bf7\u7a0d\u5019"}),(new H.widget.asyncRequest).setURI(batchAddItemsUrl).setMethod("GET").setHandle(a).setData(b).send()},searchTbItems:function(){var a=function(a){DOM.hide("#J_LeftLoading"),DOM.show("#J_MainLeftContent"),totalRecords=a.payload.totalRecords,DOM.css(DOM.get("#J_NoteIcon"),"display","none"),totalRecords>0?(DOM.css(DOM.get("#J_LEmpty"),"display","none"),DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","")):(DOM.css(DOM.get("#J_LEmpty"),"display",""),DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","none")),itemControl.renderItems(a.payload.body);var b=Math.ceil(totalRecords/a.payload.pageNum);itemControl.paginator=(new showPages("itemControl.paginator")).setRender(itemControl.handlePagination).setPageCount(b).printHtml("#J_Paging",2),itemControl.paginator=(new showPages("itemControl.paginator")).setRender(itemControl.handlePagination).setPageCount(b).printHtml("#J_TopPaging",3)};if(DOM.val(DOM.get("#J_SearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var b=encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle")));else var b="";var c=DOM.val(DOM.get("#J_SelectItemPage")),d=DOM.val(DOM.get("#J_SelectItemCid")),e=DOM.val(DOM.get("#J_SearchSelling")),f=DOM.val(DOM.get("#J_SelectItemOrder")),g="q="+b+"&cid="+d+"&type="+e;g+="&itemOrder="+f+"&pageSize="+c,g+="&id="+listId;if(e==0){var h=DOM.val(DOM.get("#J_StartPrice")),i=DOM.val(DOM.get("#J_EndPrice"));g+="&start_price="+h+"&end_price="+i}DOM.show("#J_LeftLoading"),DOM.hide("#J_MainLeftContent"),(new H.widget.asyncRequest).setURI(loadTbItemsUrl).setMethod("GET").setHandle(a).setData(g).send()},renderItems:function(a){DOM.html(DOM.get("#J_TbItemList"),a);var b=DOM.query("#J_TbItemList .J_TbItem");Event.on(b,"mouseenter mouseleave click",function(a){var b=DOM.get(".J_CheckBox",a.currentTarget);if(b.disabled)return;a.type=="mouseenter"?DOM.addClass(a.currentTarget,"mouseover"):a.type=="mouseleave"?DOM.removeClass(a.currentTarget,"mouseover"):a.type=="click"&&(b.checked==0?(DOM.addClass(a.currentTarget,"selected"),b.checked=!0):(DOM.attr("#J_TopCheckAll","checked",!1),DOM.removeClass(a.currentTarget,"selected"),b.checked=!1))}),Event.on(DOM.query("#J_TbItemList .J_CheckBox"),"click",function(a){a.stopPropagation();var b=a.currentTarget.value;a.currentTarget.checked==1?DOM.addClass("#J_TbItem_"+b,"seletced"):DOM.removeClass("#J_TbItem_"+b,"selected")})},handlePagination:function(a){pageId=a;var b=function(a){DOM.get("#J_TopCheckAll").checked=!1,totalRecords=a.payload.totalRecords,totalRecords>0?(DOM.css(DOM.get("#J_LEmpty"),"display","none"),DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","")):(DOM.css(DOM.get("#J_LEmpty"),"display",""),DOM.css(DOM.query(".J_ItemSelectBtnHolder"),"display","none"));var b=Math.ceil(totalRecords/a.payload.pageNum);itemControl.paginator.setPage(pageId).setPageCount(b).printHtml("#J_Paging",2),itemControl.paginator.setPage(pageId).setPageCount(b).printHtml("#J_TopPaging",3),itemControl.renderItems(a.payload.body),DOM.hide("#J_LeftLoading"),DOM.show("#J_MainLeftContent")};if(DOM.val(DOM.get("#J_SearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var c=encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle")));else var c="";var d=DOM.val(DOM.get("#J_SelectItemPage")),e=DOM.val(DOM.get("#J_SelectItemCid")),f=DOM.val(DOM.get("#J_SearchSelling")),g=DOM.val(DOM.get("#J_SelectItemOrder")),h="q="+c+"&cid="+e+"&type="+f;h+="&itemOrder="+g+"&pageSize="+d,h+="&id="+listId;if(f==0){var i=DOM.val(DOM.get("#J_StartPrice")),j=DOM.val(DOM.get("#J_EndPrice"));h+="&start_price="+i+"&end_price="+j}h+="&page_id="+pageId,DOM.show("#J_LeftLoading"),DOM.hide("#J_MainLeftContent"),(new H.widget.asyncRequest).setURI(loadTbItemsUrl).setMethod("GET").setHandle(b).setData(h).send()},forceDelItem:function(a){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;var b=function(a){itemControl.msg.hide(),itemControl.listItemsPaginator?itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page):itemControl.loadItems()},c="list_item_id="+a;itemControl.msg=new H.widget.msgBox({dialogType:"loading",content:"\u5f3a\u5236\u5220\u9664\u4e2d\uff0c\u8bf7\u7a0d\u5019"}),(new H.widget.asyncRequest).setURI(forceDelUrl).setMethod("GET").setHandle(b).setData(c).send()},retry:function(a){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;var b=function(a){itemControl.msg.hide(),itemControl.listItemsPaginator?itemControl.listItemsPaginator.toPage(itemControl.listItemsPaginator.page):itemControl.loadItems()},c="list_item_id="+a;itemControl.msg=new H.widget.msgBox({dialogType:"loading",content:"\u7cfb\u7edf\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019"}),(new H.widget.asyncRequest).setURI(retryUrl).setMethod("GET").setHandle(b).setData(c).send()},batchRetry:function(){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;var a=function(a){itemControl.msg.hide(),itemControl.paginator?itemControl.paginator.toPage(itemControl.paginator.page):itemControl.loadItems()},b="id="+listId;itemControl.msg=new H.widget.msgBox({dialogType:"loading",content:"\u7cfb\u7edf\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019"}),(new H.widget.asyncRequest).setURI(batchRetryUrl).setMethod("GET").setHandle(a).setData(b).send()},loadItems:function(){var a=function(a){totalRecords=a.payload.totalRecords,totalRecords>0?(DOM.css(DOM.get("#J_REmpty"),"display","none"),DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display","")):(DOM.css(DOM.get("#J_REmpty"),"display",""),DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display","none")),DOM.html(DOM.get("#J_PromotionItemList"),a.payload.body),itemControl.renderPromoItems();var b=Math.ceil(totalRecords/a.payload.pageNum);itemControl.listItemsPaginator=(new showPages("itemControl.listItemsPaginator")).setRender(itemControl.listItemsPaginationHandle).setPageCount(b).printHtml("#J_PromotionItemPaging",2),DOM.hide("#J_RightLoading"),DOM.show("#J_MainRightContent")};if(DOM.val(DOM.get("#J_RightSearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var b=encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle")));else var b="";var c=DOM.val(DOM.get("#J_SearchStatus")),d=DOM.val(DOM.get("#J_RightSelectItemPage")),e="q="+b+"&status="+c+"&pageSize="+d+"&id="+listId;DOM.show("#J_RightLoading"),DOM.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadItemsUrl).setMethod("GET").setHandle(a).setData(e).send()},listItemsPaginationHandle:function(a){pageId=a;var b=function(a){DOM.get("#J_RightCheckAll").checked=!1,totalRecords=a.payload.totalRecords,totalRecords>0?(DOM.css(DOM.get("#J_REmpty"),"display","none"),DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display","")):(DOM.css(DOM.get("#J_REmpty"),"display",""),DOM.css(DOM.query(".J_PromotionItemBtnHolder"),"display","none"));var b=Math.ceil(totalRecords/a.payload.pageNum);itemControl.listItemsPaginator.setPage(pageId).setPageCount(b).printHtml("#J_PromotionItemPaging",2),DOM.html(DOM.get("#J_PromotionItemList"),a.payload.body),itemControl.renderPromoItems(),DOM.hide("#J_RightLoading"),DOM.show("#J_MainRightContent")};if(DOM.val(DOM.get("#J_RightSearchTitle"))!="\u5173\u952e\u5b57\u3001\u5546\u54c1\u94fe\u63a5\u3001\u5546\u54c1\u7f16\u7801")var c=encodeURIComponent(DOM.val(DOM.get("#J_RightSearchTitle")));else var c="";var d=DOM.val(DOM.get("#J_SearchStatus")),e=DOM.val(DOM.get("#J_RightSelectItemPage")),f="q="+c+"&status="+d+"&pageSize="+e+"&id="+listId+"&page_id="+pageId;DOM.show("#J_RightLoading"),DOM.hide("#J_MainRightContent"),(new H.widget.asyncRequest).setURI(loadItemsUrl).setMethod("GET").setHandle(b).setData(f).send()},renderPromoItems:function(){var a=DOM.query("#J_PromotionItemList .J_TbItem");Event.on(a,"mouseenter mouseleave click",function(a){var b=DOM.get("#"+a.currentTarget.id+" .J_CheckBox");if(b.disabled)return;a.type=="mouseenter"||a.type=="mouseleave"?DOM.toggleClass(a.currentTarget,"hover"):a.type=="click"&&(b.checked==0?(DOM.addClass(a.currentTarget,"selected"),b.checked=!0):(DOM.attr("#J_RightCheckAll","checked",!1),DOM.removeClass(a.currentTarget,"selected"),b.checked=!1))}),Event.on(DOM.query("#J_PromotionItemList .J_CheckBox"),"click",function(a){a.stopPropagation();var b=a.currentTarget.value;a.currentTarget.checked==1?DOM.addClass("#J_Item_"+b,"selected"):(DOM.attr("#J_RightCheckAll","checked",!1),DOM.removeClass("#J_Item_"+b,"selected"))})},retryHandle:function(a){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;var b=DOM.attr(this,"data"),c=function(a){itemControl.paginator?itemControl.paginator.toPage(itemControl.paginator.page):itemControl.loadItems()},d="list_item_id="+b+"&form_key="+FORM_KEY;(new H.widget.asyncRequest).setURI(retryUrl).setMethod("POST").setHandle(c).setData(d).send()},removeItems:function(a){if(!showPermissions("editor_material","\u4fc3\u9500\u7d20\u6750"))return;DOM.attr("#J_RemoveItems","disabled",!0),DOM.replaceClass("#J_RemoveItems","btm-caozuo-orange","btm-caozuo-gray-none"),a.preventDefault(),itemIds=[],checkBoxs=DOM.query("#J_PromotionItemList .J_CheckBox"),len=checkBoxs.length;for(i=0;i<len;i++)checkBoxs[i].checked&&!checkBoxs[i].disabled&&itemIds.push(checkBoxs[i].value);if(itemIds.length==0){new H.widget.msgBox({title:"\u9519\u8bef\u63d0\u793a",content:"\u672a\u9009\u62e9\u4efb\u4f55\u5b9d\u8d1d",autoClose:!0,timeOut:1e3}),DOM.attr("#J_RemoveItems","disabled",!1),DOM.replaceClass("#J_RemoveItems","btm-caozuo-gray-none","btm-caozuo-orange");return}var b=function(a){DOM.attr("#J_RemoveItems","disabled",!1),DOM.replaceClass("#J_RemoveItems","btm-caozuo-gray-none","btm-caozuo-orange"),len=checkBoxs.length;for(i=0;i<len;i++)checkBoxs[i].checked&&!checkBoxs[i].disabled&&(DOM.html(DOM.get("#J_Status_"+checkBoxs[i].value),'<div class="status-pendding"><div>\u7b49\u5f85\u5904\u7406</div></div>'),checkBoxs[i].disabled="disabled");new H.widget.msgBox({title:"",dialogType:"loading",content:"\u5df2\u6210\u529f\u6dfb\u52a0\u4efb\u52a1\uff0c\u7a0d\u540e\u5373\u53ef\u540c\u6b65\u5230\u6dd8\u5b9d\uff0c\u53ef\u5237\u65b0\u9875\u9762\u67e5\u770b\u72b6\u6001",autoClose:!0,timeOut:2e3})},c="id="+listId+"&item_ids="+itemIds+"&form_key="+FORM_KEY;(new H.widget.asyncRequest).setURI(removeItemsUrl).setMethod("POST").setHandle(b).setData(c).send()},rightCheckAll:function(a){checkBoxs=DOM.query("#J_PromotionItemList .J_CheckBox"),len=checkBoxs.length;for(i=0;i<len;i++){var b=checkBoxs[i].value;if(checkBoxs[i].disabled)continue;this.checked?(checkBoxs[i].checked=!0,DOM.addClass("#J_Item_"+b,"selected")):(DOM.attr("#J_RightCheckAll","checked",!1),DOM.removeClass("#J_Item_"+b,"selected"),checkBoxs[i].checked=!1)}}}},{requires:["utils/showPages/index"]}); 