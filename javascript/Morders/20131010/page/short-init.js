/*
combined files : 

utils/showPages/index
page/short-init

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
KISSY.add('page/short-init',function (S,showPages,O) {
    // your code here
	var DOM = S.DOM, Event = S.Event;	
	
	return shortControl = {
	    	paginator : null,
			handlePagination :null,
			handlePagination2 :null,
	    	isFisrst : true,
	    	init : function() {
				shortControl.searchTbItems();
				Event.on('#J_Search','click',function(){
					shortControl.searchTbItems();
				})
				Event.on('#J_WaitPay','click',function(ev){
					if(DOM.attr(ev.currentTarget,'checked')){
						var readyDelivery = DOM.val(ev.currentTarget);
						shortControl.readyDelivery(readyDelivery);
					}else{
						shortControl.searchTbItems();
					}
				})				
				Event.delegate(document,'click','.J_EditShort',function(ev){
					var data = DOM.attr(ev.currentTarget,'data');
					DOM.hide(ev.currentTarget);
					DOM.show('#J_ShowEditorShort_'+data)
					DOM.get('#J_InputShort_'+data).focus();
				})
				Event.delegate(document,'blur','.J_InputShort',function(ev){
					var data = DOM.attr(ev.currentTarget,'data');
					KISSY.later(function(){
						DOM.hide('#J_ShowEditorShort_'+data);
						DOM.show('#J_EditShort_'+data);
		 			},200,false,null);
			 	});
				Event.delegate(document,'click','.J_Save',function(ev){
					var data = DOM.attr(ev.currentTarget,'data');
					shortControl.shortSave(data);
				})	
				Event.delegate(document,'click','.details',function(ev){
					var data = DOM.attr(ev.currentTarget,'title');
					shortControl.shortDelete(data);
				})					
	        },
	        readyDelivery : function(num) {
	            var submitHandle = function(o) {
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					}else{
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
					shortControl.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
					shortControl.paginator = new showPages('shortControl.paginator').setRender(shortControl.handlePagination2).setPageCount(pageCount).printHtml('#J_Paging',2);
					shortControl.paginator = new showPages('shortControl.paginator').setRender(shortControl.handlePagination2).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	    	    };
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});
					DOM.hide('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');					
					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');					
	    	    };	  
	 			DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
				var pagesize =10;	
				var data = "readyDelivery="+num+"&pageSize="+pagesize;
	    	    new H.widget.asyncRequest().setURI(loadReadydeliveryUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},		        
	        shortDelete : function(num) {
	            var submitHandle = function(o) {
	            	DOM.html('#J_EditShort_'+num,'<span class="editItemNum"></span>编辑宝贝简称...')
	    	    };
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});				
	    	    };	    	    
	    	    var title = DOM.val('#J_InputShort_'+num);
				var data = "numIid="+num;
	    	    new H.widget.asyncRequest().setURI(loadSearchUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},		        
	        shortSave : function(num) {
	            var submitHandle = function(o) {
	            	DOM.html('#J_EditShort_'+num,DOM.val('#J_InputShort_'+num))
	    	    };
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});				
	    	    };	   
	    	    var title = DOM.val('#J_InputShort_'+num);
				var data ="short="+title+"&num_iid="+num;
	    	    new H.widget.asyncRequest().setURI(loadSearchUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},	        
	        searchTbItems : function() {
	            var submitHandle = function(o) {
					DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
	        	    totalRecords = o.payload.totalRecords;
					if(totalRecords > 0){
						DOM.css(DOM.get('#J_LEmpty') ,'display','none');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
					}else{
						DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
						DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
					}
					shortControl.renderItems(o.payload.body);
					var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
					shortControl.paginator = new showPages('shortControl.paginator').setRender(shortControl.handlePagination).setPageCount(pageCount).printHtml('#J_Paging',2);
					shortControl.paginator = new showPages('shortControl.paginator').setRender(shortControl.handlePagination).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	    	    };
	    	    var errorHandle = function(o){
					new H.widget.msgBox({
							    title:"错误提示",
							    content:o.desc,
							    type:"error"
							});
					DOM.hide('#J_LeftLoading');
					DOM.hide('#J_MainLeftContent');					
					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');					
	    	    };	    	    
   	    	    if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
   	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); 
   	    	    }else{
   	    	    	var title ='';
   	    	    }  
   	    	    var cid = DOM.val('#J_SelectItemCid')
	    	    var itemtype  = DOM.val('#J_Itemtype');
	    	    var pagesize =10;
	 			DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
				var data = "type="+itemtype+"&q="+title+"&pageSize="+pagesize+"&cid="+cid;
	    	    new H.widget.asyncRequest().setURI(loadSearchUrl).setMethod("POST").setHandle(submitHandle).setErrorHandle(errorHandle).setData(data).send();
			},
			renderItems: function(c) {
	    	    DOM.html(DOM.get("#J_TbItemList"), c);
			},
	    	handlePagination : function(turnTo) {
		    	var pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
	 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
	 				} else {
	 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
	 				}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
	 				shortControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	 				shortControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	 				shortControl.renderItems(o.payload.body);
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
		    	//var data = shortControl.getData();
		    	var pagesize =10;
   	    	    if(DOM.val(DOM.get("#J_SearchTitle")) != '关键字、商品链接、商品编码'){
   	    	    	var title = encodeURIComponent(DOM.val(DOM.get("#J_SearchTitle"))); 
   	    	    }else{
   	    	    	var title ='';
   	    	    }  
   	    	    var cid = DOM.val('#J_SelectItemCid')
	    	    var itemtype  = DOM.val('#J_Itemtype');
	    	    var pagesize =10;		    	
				data ="page_id="+pageId+"&pageSize="+pagesize+"&type="+itemtype+"&q="+title+"&pageSize="+pagesize+"&cid="+cid;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadSearchUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			},
	    	handlePagination2 : function(turnTo) {
		    	var pageId = turnTo;
	    		var submitHandle = function(o) {
	    			 totalRecords = o.payload.totalRecords;
	 				if(totalRecords > 0){
	 					DOM.css(DOM.get('#J_LEmpty') ,'display','none');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") ,'display' , '');
	 				} else {
	 					DOM.css(DOM.get('#J_LEmpty'), 'display' , '');
	 					DOM.css(DOM.query(".J_ItemSelectBtnHolder") , 'display' , 'none');
	 				}
	 				var pageCount = Math.ceil(totalRecords/o.payload.pageSize); 
	 				shortControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_Paging',2);
	 				shortControl.paginator.setPage(pageId).setPageCount(pageCount).printHtml('#J_TopPaging',3);
	 				shortControl.renderItems(o.payload.body);
	 				DOM.hide('#J_LeftLoading');
					DOM.show('#J_MainLeftContent');
		    	};
	    	    var pagesize =10;		    	
				data ="page_id="+pageId+"&pageSize="+pagesize+"&readyDelivery="+1;
				DOM.show('#J_LeftLoading');
				DOM.hide('#J_MainLeftContent');
	    	    new H.widget.asyncRequest().setURI(loadReadydeliveryUrl).setMethod("GET").setHandle(submitHandle).setData(data).send();
			}				
	}
}, {
    requires: ['utils/showPages/index','overlay']
});
