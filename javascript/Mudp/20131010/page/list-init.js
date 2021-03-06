/*
combined files : 

utils/showPages/index
page/list-init

*/
/**
 * @分页组件
 * @author  @sjs_stef
 */
KISSY.add('utils/showPages/index',function (S) {
    var DOM = S.DOM, Event = S.Event, doc = document;
  
    function showPages(name) { //初始化属性 
        var self = this; 
        if (!(self instanceof showPages)) { 
            return new showPages(name); 
        }   
        this.pageNum = 4 ;   
        this.name = name;      //对象名称
        this.page = 1;         //当前页数
        this.pageCount = 200;    //总页数
        this.argName = 'page'; //参数名    
    }

    S.mix(showPages.prototype,{
        jump: function() {
            return undefined;
        },
        
        //进行当前页数和总页数的验证
        checkPages: function() { 
            if (isNaN(parseInt(this.page))) this.page = 1;
            if (isNaN(parseInt(this.pageCount))) this.pageCount = 1;
            if (this.page < 1) this.page = 1;
            if (this.pageCount < 1) this.pageCount = 1;
            if (this.page > this.pageCount) this.page = this.pageCount;
            this.page = parseInt(this.page);
            this.pageCount = parseInt(this.pageCount);
        },
        
        //生成html代码    
        _createHtml: function(mode) { 
       
            var self = this, strHtml = '', prevPage = this.page - 1, nextPage = this.page + 1;   
            if (mode == '' || typeof(mode) == 'undefined') mode = 1;
        
            switch (mode) {
                case 1: 
                    //模式1 (页数)
                     strHtml += '<div class="page-bottom"> <div class="sabrosus">';
	   					strHtml += '<font class="number">';
	   					strHtml += '共'+this.pageCount+'页&nbsp;';
	   					strHtml += '<input style="" type="text"  class="page-input" id="pageInput' + self.name + '"  value="页码" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.className=\'page-input page-input-text-on \';if(this.value==\'页码\'){this.value = \'\';}" onblur="this.className=\'page-input\';if(this.value==\'\'){this.value = \'页码\'}">';
	   					strHtml += '<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput' + self.name + '\').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>'+this.pageCount+'){ var turnTo = '+this.pageCount+';} else{var turnTo = page;}  window.' + self.name + '.toPage(turnTo);" >';
	   					strHtml += '</font>';	
	   				    if (prevPage < 1) {
	                        strHtml += '<span class="pre-none page-pic-no"></span>';
	                    } else {
	                        strHtml += '<span title="上一页" class="pre page-pic-no" onclick="' + self.name + '.toPage(' + prevPage + ');"></span>';
	                    }
	   					if (nextPage > this.pageCount) {
	                    	strHtml += '<span class="next-none page-pic-no"></span>';
	                    } else {
	                    	strHtml += '<span title="下一页" class="next page-pic-no" onclick="' + self.name + '.toPage(' + nextPage + ');"></span>';
	                    }
	   				 strHtml += '<div style="clear:both"></div></div></div> '; 
                    break;
                                 
                    case 2: 
    					//模式2 (前后缩略,页数,首页,前页,后页,尾页)
                    	
    					if(this.pageCount > 1){
    	                    strHtml += '<div class="page-bottom"> <div class="sabrosus">';
    	                    
    	                    if (this.pageCount > 5) {
    		   					strHtml += '<font class="number">';
    		   					strHtml += '共'+this.pageCount+'页&nbsp;';
    		   					strHtml += '<input style="" type="text"  class="page-input" id="pageInput' + self.name + '"  value="页码" onkeypress="return window.' + self.name + '.formatInputPage(event);" onfocus="this.className=\'page-input page-input-text-on \';if(this.value==\'页码\'){this.value = \'\';}" onblur="this.className=\'page-input\';if(this.value==\'\'){this.value = \'页码\'}">';
    		   					strHtml += '<input type="button" value="Go" class="btm-go" onclick="javascript:var page = document.getElementById(\'pageInput' + self.name + '\').value; if(isNaN(Number(page))|| Number(page)==0) { var turnTo = 1;} else if(page>'+this.pageCount+'){ var turnTo = '+this.pageCount+';} else{var turnTo = page;}  window.' + self.name + '.toPage(turnTo);" >';
    		   					strHtml += '</font>';	
    	                    }
    	                    
    	                    
    	                    if (prevPage < 1) {
    	                        strHtml += '<span class="pre-none page-pic-no"></span>';
    	                    } else {
    	                        strHtml += '<span title="上一页" class="pre page-pic-no" onclick="' + self.name + '.toPage(' + prevPage + ');"></span>';
    	                    }
    	                    
    	                    if (this.page != 1) {
    							//strHtml += ' <a class="a-padding" href="javascript:' + self.name  + '.toPage(1);">1</a>';
    						}
    						if(this.page - 2<=0){
    							var start = 1;
    								if (this.pageCount > this.page + 4) {
    	                           		var endPage = this.page + 4;
    	                           } else {
    	                             	var endPage = this.pageCount; 
    	                            }
    						}else if(this.page + 2>=this.pageCount){
    							var start = this.pageCount-4;
    							if (this.pageCount > this.page + 4) {
    	                       		var endPage = this.page + 4;
    	                        } else {
    	                         	var endPage = this.pageCount; 
    	                        }
    						}else {
    							var start = this.page - 2;
    							if (this.pageCount > this.page + 2) {
    		                           		var endPage = this.page + 2;
    		                           } else {
    		                             	var endPage = this.pageCount; 
    		                             }
    						}
    	                    for (var i = start; i <= endPage; i++) {
    	                    if (i > 0) {
    	                       	if (i == this.page) {
    	                           	strHtml += '<span class="current a-padding">'+ i + '</span>';
    	                        } else {
    	                           // if (i != 1 && i != this.pageCount) {
    	                              	strHtml += '<a class="a-padding" href="javascript:' + self.name + '.toPage(' + i + ');">' + i + '</a>';
    	                           // }
    						      }
    	                    }
    	                    }
    	                    if (this.page + 5 < this.pageCount) {
    							strHtml += '<a class="a-padding" title="" href="javascript:' + self.name + '.toPage(' + (this.page + 3) + ');">...</a>';
    						}
    				  	    if (this.page != this.pageCount) {
    							//strHtml += '<span title="Page ' + this.pageCount + '"><a href="javascript:' + self.name + '.toPage(' + this.pageCount + ');">' + this.pageCount + '</a></span>';
    						}
    						if (nextPage > this.pageCount) {
    	                    	strHtml += '<span class="next-none page-pic-no"></span>';
    	                    } else {
    	                    	strHtml += '<span title="下一页" class="next page-pic-no" onclick="' + self.name + '.toPage(' + nextPage + ');"></span>';
    	                      }
    						
    						
    						
    	                   strHtml += '<div style="clear:both"></div></div></div> ';
    					}
                       break;
    			   case 3 :
    				   strHtml += '<div class="page-top"><div class="sabrosus"><span class="count">' + this.page + ' / ' + this.pageCount + '</span>';
                       if (prevPage < 1) {
                           strHtml += ' <span class="pre-none page-pic-no"></span>';
                       } else {
                           strHtml += '<a class="border-left-dedede" href="javascript:' + self.name + '.toPage(' + prevPage + ');" title="上一页"><span class="pre page-pic-no"></span></a>';
                         }
                       if (nextPage > this.pageCount) {
                       	strHtml += '<span class="next-none page-pic-no"></span>';
                       } else {
                           strHtml += '<a href="javascript:' + self.name + '.toPage(' + nextPage + ');" title="下一页"><span class="next page-pic-no"></span></a>';
                         }
                      strHtml += '<div style="clear:both"></div></div></div>';
                      break;
                    
            }
            return strHtml; 
               
        },
         //限定输入页数格式
        formatInputPage : function(e){
            var ie = navigator.appName=="Microsoft Internet Explorer"?true:false;
            if(!ie) var key = e.which;
            else var key = event.keyCode;
            if (key == 8 || key == 46 || (key >= 48 && key <= 57)) return true;
            return false;
        },
      
        //页面跳转 返回将跳转的页数
        toPage: function( page ,flag) { 
            var turnTo = 1;
            var self = this;    
            if (typeof(page) == 'object') {
                turnTo = page.options[page.selectedIndex].value;
            } else {
                turnTo = page;
              }
            
            self.jump(turnTo,flag,'');
              
        },
              
        //显示html代码
        printHtml: function(contian, mode) {  
            this.checkPages();
            DOM.html(contian,this._createHtml(mode));
            return this;
        },
                   
        //设置总页数           
        setPageCount: function( pagecount ) {
            this.pageCount=pagecount;
            return this;
        },              
        
        getPageCount: function() {
            return this.pageCount;
        },
        
        //设置跳转 执行函数
        setRender: function(fn) {
            this.jump = fn;
            return this;
        },  
        setPageNum:function(page_num){
            this.pageNum = page_num;
            return this;
         },
        setPage:function(page){
            this.page = page;  
            return this; 
        }          

               
    });

    return showPages;
  
});
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/list-init',function (S,showPages,Select) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return list = {
	    	Paginator : null,
	    	msg :null,
	    	init : function() {

				var items = [
				  {text:'上架时间：早',value:'0'},
				  {text:'上架时间：晚',value:'1'}
		   	    ],
		   	    select = new Select.Select({  
		   		    render:'#J_SelectPage',
		   	      	valueField:'#J_PageHide',
		   	      	items:items
		   		});
		   		select.render();
	   			select.setSelectedValue('0');
		   		var items1 = [
   		   	      {text:'10条',value:'10'},
   		   	      {text:'20条',value:'20'},
   		   	      {text:'30条',value:'30'},
   		   	      {text:'40条',value:'40'},
   		   	      {text:'50条',value:'50'},
   		   	      {text:'100条',value:'100'}
   		   	    ],
   		   	    select1 = new Select.Select({  
   		   		    render:'#J_SelectOrder',
   		   	      	valueField:'#J_OrderHide',
   		   	      	items:items1
   		   		});
   		   		select1.render();
	   			select1.setSelectedValue('10');
	              select2 = new Select.Select({  
		            	  render:'#J_SelectCid',
		            	  valueField:'#J_CidHide',
		            	  items:cidItem
	              });
	   			select2.render();
	   			select2.setSelectedValue('0');
	   			var items3 = [
	   			              {text:'全部',value:'0'},
	   			              {text:'出售中',value:'1'},
	   			              {text:'库中',value:'2'}
	   			              ],
	              select3 = new Select.Select({  
		            	  render:'#J_SelectSell',
		            	  valueField:'#J_SellHide',
		            	  items:items3
	              });
	   			select3.render();
	   			select3.setSelectedValue('0');
				list.searchTbItems();
				Event.on('#J_Sort .sort','click',function(ev){
					DOM.removeClass(DOM.query('#J_Sort .sort'),'current');
					DOM.addClass(ev.currentTarget,'current');
					var data = DOM.attr(ev.currentTarget,'data')+':desc';
					DOM.val('#J_SortValue',data);
					list.searchTbItems();
				});
				Event.on('#J_target','mouseenter mouseleave',function(ev){
					if(ev.type == 'mouseenter'){					
						DOM.addClass(ev.currentTarget,'mouseenter');
						DOM.show('.yuanjiao');
						}else if(ev.type == 'mouseleave'){
							DOM.removeClass(ev.currentTarget,'mouseenter');
							DOM.hide('.yuanjiao');
						}
				});
				
				if(S.one('#J_SyncItemsButton')){
					/*同步宝贝*/
					Event.on('#J_SyncItemsButton','click', function(ev){
						var box = DOM.parent(ev.currentTarget);
						DOM.hide(box);
					    var submitHandle = function(o) {
								new H.widget.msgBox({
									    title:"温馨提示",
									    content:'同步数据请求成功，请点击搜索查看宝贝。如无法显示请过1分钟左右再查看',
									    type:"info"
									});
							KISSY.later(function(box){DOM.show(box);},60000,false,null,box)
				        }
						var data = "";
						new H.widget.asyncRequest().setURI(syncItemsUrl).setHandle(submitHandle).setMethod("GET").setData(data).setDataType('json').send();
					});	
					
				}
				
	        },
		   searchTbItems : function() {
	            var submitHandle = function(o) {
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					DOM.css(DOM.get('#J_NoteIcon') ,'display','none');
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					} else {
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
					list.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
					list.paginator = new showPages('list.paginator').setRender(list.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
	    	    };
	        	var data = list.getParamsData();
	 			DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
			getParamsData : function(){
				 if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); //标题
	    	    }else{
	    	    	var title ='';
	    	    }
				var itemPage = DOM.val(DOM.get("#J_OrderHide"));//每页多少条
					var cid = DOM.val(DOM.get("#J_CidHide")); //类目
	    	    	var type = DOM.val(DOM.get("#J_SellHide")); //出售中 库中
	    	    	var sortvalue = DOM.val('#J_SortValue');
	    	    	if(sortvalue == 0 || sortvalue == 1){
						var itemOrder = DOM.val(DOM.get("#J_PageHide"));//排序方式
					}else{
						var itemOrder = sortvalue;//排序方式
					}
	    	    	var data = "q="+title+"&cid="+cid+"&type="+type;
	            	    data +="&itemOrder="+itemOrder+"&pageSize="+itemPage;
					
	    	    	if (type == 0) {
						//价格区间
						var startPrice = DOM.val(DOM.get("#J_StartPrice"));
						var endPrice = DOM.val(DOM.get("#J_EndPrice"));
						data += "&start_price="+startPrice+"&end_price="+endPrice;
					}
				return data ;	
				
			},
			renderItems: function(c) {
	    	    DOM.html(DOM.get("#J_TbItemList"), c);
	        	var lis = DOM.query("#J_TbItemList .J_TbItem");
	        	Event.on(lis, "mouseenter mouseleave", function(ev){
	        		if(ev.type == 'mouseenter'){
						DOM.addClass(ev.currentTarget,'mouseover');
	        		}else if(ev.type == 'mouseleave'){
						DOM.removeClass(ev.currentTarget,'mouseover');
					}
	        	});
	        	
	        	//添加样式
	        	var data;	        	
	        	S.each(S.all('#J_Sort .sort'), function(v,k) {
	        		if(DOM.hasClass(v, 'current')) {
	        			data = DOM.attr(v, 'data');
	        		}
	        		return data;
	        	})
	        	S.each(S.all('#J_TbItemList li'), function(v, k) {
	    			if(DOM.attr(v, 'data') == data) {
	    				DOM.addClass(v, 'current-row');
	    			}
	    		})
			},
			
	    	handlePagination : function(turnTo) {
		    	pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
	 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
	 				} else {
	 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
	 				}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageNum); 
	    			list.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
					//list.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	        	    list.renderItems(o.payload.body);
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	var data = list.getParamsData();
		         data += "&page_id="+pageId;
				 DOM.show('#J_LeftLoading');
			    DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadTbItemsUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			}
	
	}
}, {
    requires: ['utils/showPages/index','bui/select']
});
