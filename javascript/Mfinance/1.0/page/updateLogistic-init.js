/**
 * 新建物流模板
 * @author  
 */
KISSY.add(function (S,showPages,beautifyForm,Select,Overlay,LinkSelect,XTemplate) {
	var DOM = S.DOM, Event = S.Event;
	var returnCompany;
	return updateLogisticControl = {
			msg : null,
			index : 0,
			areasDialog:null,
			type : 1 ,  // 1为编辑地区，2为创建模板
			select:null,
			standardsSelect:null,
			selects1:[],
			selects2:[],
			selects3:[],
			x : new beautifyForm,
			groupList : eval('('+ groupJson +')'),
			init : function() {
				Event.delegate(document,'click','.J_addBtn',function(){
		     		DOM.show('.J_start2_val');
					DOM.show('.J_start2Standard');
					DOM.hide('.J_addStart');
		     	})
		     	//取消添加首重标准
				Event.on('.J_del','click',function(){
					DOM.hide('.J_start2_val');
					DOM.hide('.J_start2Standard');
					DOM.show('.J_addStart');
				});
				updateLogisticControl.getCompany();
//				    select = new Select.Select({  
//			   		    render:'#J_Company',
//			   	      	valueField:'#J_CompanyValue',
//			   	      	items:logicCompany
//		 	        });
//					select.render();
//					select.setSelectedValue('0');
				 var province=DOM.attr('#J_province','data');	
				 var city=DOM.attr('#J_city','data');
				 var  a = new LinkSelect(["#J_Capital","#J_City"],tdist, {
		            	defval: {
	 						text: "全部地区", val: "0"
	 				 	},
						rootid: 1 //根节点的ID，默认为0
	
					});	
				  a.focus(1,city);
				  var firWeight=DOM.attr('#J_start1Standards','data');
			   	  var fir2Val=DOM.attr('#J_addStandards','data');
			   	  var addWeight=DOM.attr('#J_start2Standards','data');
			   	  var standardsItems = [
				   	   		   	      {text:'0.5千克以内',value:'0.5'},
				   	   		   	      {text:'1千克以内',value:'1.0'}
				   	   		   	    ],standardsSelect = new Select.Select({  
				   	   		   		    render:'#J_start1Standards',
				   	   		   	      	valueField:'#J_start1StandardsV',
				   	   		   	      	items:standardsItems
				   	   		   		});
								   	standardsSelect.render();
								   	standardsSelect.setSelectedValue(firWeight);
								   	
								    select4 = new Select.Select({  
				   	   		   		    render:'#J_addStandards',
				   	   		   	      	valueField:'#J_addStandardsV',
				   	   		   	      	items:standardsItems
				   	   		   		});
				   	   		   		select4.render();addWeight
				   			   		select4.setSelectedValue(fir2Val);
				   	   		   		select5 = new Select.Select({  
				   	   		   		    render:'#J_start2Standards',
				   	   		   	      	valueField:'#J_start2StandardsV',
				   	   		   	      	items:standardsItems
				   	   		   		});
				   	   		   		select5.render();
				   			   		select5.setSelectedValue(addWeight);
					   			 	Event.on('#J_addBtn','click',function(){
							     		DOM.hide('.J_LinkBtn');
							     		DOM.show('#J_hideStandards');
							     	})
							     	Event.delegate(document,'click','.J_addBtn',function(ev){
							     		var data = DOM.attr(ev.currentTarget,'data');
							     		DOM.hide(DOM.parent(ev.currentTarget,'p'))
							     		DOM.show('#J_hideStandards_'+data);
							     	})
							     	
				    	Event.delegate(document,'click','.J_EditAreas',function(ev){
						updateLogisticControl.type = 1 ;
						// 表示当前编辑的数组下标
						updateLogisticControl.index = DOM.attr(ev.currentTarget,'data');
						DOM.hide('#J_logistics_pop');
						updateLogisticControl.areasDialog.set('title','编辑地区');
						updateLogisticControl.areasDialog.set('height','566');
						// 编辑 赋值上原有的 地区
						var checkBoxs =  DOM.filter (DOM.query('#J_areaList'+' input'),function(i){if(i.type =='checkbox')return true;});
						for(var i = 0,len=checkBoxs.length; i < len; i++){
							updateLogisticControl.x.setCheckboxOff(checkBoxs[i]);
						}
						var areas = updateLogisticControl.groupList[updateLogisticControl.index].areas;
						for(var i = 0,len=areas.length; i < len; i++){
							if(S.one('#J_'+areas[i])){
								DOM.prop('#J_'+areas[i],'disabled',false);
								updateLogisticControl.x.setCheckboxOn('#J_'+areas[i]);
							}
						}
						updateLogisticControl.areasDialog.show();
			     	})
					updateLogisticControl.initAreasDialog();
					   			 	
					Event.delegate(document,'click','#J_Add-other',function(ev){
						updateLogisticControl.type = 2;
						DOM.show('#J_logistics_pop');
						updateLogisticControl.areasDialog.set('title','新建模板');
						updateLogisticControl.areasDialog.set('height','680');
						var checkBoxs =  DOM.filter (DOM.query('#J_areaList'+' input'),function(i){if(i.type =='checkbox')return true;});
						for(var i = 0; i < checkBoxs.length; i++){
							updateLogisticControl.x.setCheckboxOff(checkBoxs[i]);
						}
						var items =  updateLogisticControl.groupList;
						for(i = 0; i < items.length; i++){	
							var areas = updateLogisticControl.groupList[i].areas;
							for(var j = 0,len=areas.length; j < len; j++){
								if(S.one('#J_'+areas[j])){
									DOM.prop('#J_'+areas[j],'checked',true);
									updateLogisticControl.x.setCheckboxDisabled('#J_'+areas[j]);
								}
							}
						}
						updateLogisticControl.areasDialog.show();
			     	});	
					
							  
			     	 //删除
					Event.delegate(document,'click','.J_delete',function(ev){
						var id=DOM.attr(ev.currentTarget,'data');
				   		DOM.val('#J_delVal',id);
		        		if(!updateLogisticControl.dialog){
		        			updateLogisticControl.dialog = new Overlay.Dialog({
			     	            title:'删除',
			     	            width:330,
				 	            height:150,
			     	            mask:true,
			     	            buttons:[
				     	                   {
				     	                     text:'确定',
				     	                     elCls : 'bui-button bui-button-primary',
				     	                     handler : function(){
				     	                	  var submitHandle = function(o){
													new H.widget.msgBox({ 
											 			type: "sucess", 
											 			content: "删除成功",
														dialogType:"msg", 
														autoClose:true, 
														timeOut:3000
													});
													window.location.reload();
							         	       };		     	        	 
								         	    var errorHandle = function(o){
												new H.widget.msgBox({
												    title:"错误提示",
												    content:o.desc,
												    type:"error"
												});
							         	      };
							         	  var detail_id=DOM.val('#J_delVal');
						              	  var data ='&detail_id='+detail_id;
						    	  		  new H.widget.asyncRequest().setURI(delLogisticDetailUrl).setHandle(submitHandle).setMethod("GET").setData(data).send();
				     	                  this.hide();
				     	                     }
				     	                   },{
				     	                     text:'取消',
				     	                     elCls : 'bui-button',
				     	                     handler : function(){
				     	                       this.hide();
				     	                     }
				     	                   }
			     	                 ],
			     	            
			     	                bodyContent:'<div style="text-align:center;"><div class="ui-confirm-message-content" style="color:#656D7A;font-size:15px;height:20px;line-height:20px;margin-bottom:5px;font-weight:bold;">是否确认删除该物流模板？</div></div>'
		     	          });
		        	    }
			 	         updateLogisticControl.dialog.show();
			 	       
					});
					    	    
			     	Event.delegate(document,'click','#J_NextStep',function(ev){
			     			var items = updateLogisticControl.tempSave();
			     			var itemsJson = KISSY.JSON.stringify(items);
			     			var start1_standards=DOM.val('#J_start1StandardsV');
							var start1_fees=DOM.val('#J_start1Fees');
							var	start2_standards=DOM.val('#J_start2StandardsV');
							var start2_fees=DOM.val('#J_start2Fees');
							var add_standards=DOM.val('#J_addStandardsV');
							var add_fees=DOM.val('#J_addFees');
							var company = DOM.val('#J_CompanyValue');
							var province = DOM.val('#J_Capital');
							var city = DOM.val('#J_City');
				     	   	var sucessHandle = function(o){	
					     	   	//updateLogisticControl.msg.hide();
				        		new H.widget.msgBox({ 
						 			type: "sucess", 
						 			content: "保存成功",
									dialogType:"msg", 
									autoClose:true, 
									timeOut:3000
								});			
				     	   	}; 
				     	   
			 			 var data ="items="+itemsJson+"&province="+province+"&city="+city+"&company="+company;
			 			 	 data+="&start1_standards="+start1_standards+"&start1_fees="+start1_fees+"&start2_standards="+start2_standards
			 			 	 data+="&start2_fees="+start2_fees+"&add_standards="+add_standards+"&add_fees="+add_fees
			 			 new H.widget.asyncRequest().setURI(updateLogisticsTemplateUrl).setMethod("POST").setHandle(sucessHandle).setData(data).send();
			     		
			     	})	     	
					updateLogisticControl.renderSelectItems();	     	
					
		     
			},
			getCompany:function(){
				var sucessHandle = function(o){	
                  var company=o.payload;
 					select = new Select.Select({  
			   		    render:'#J_Company',
			   	      	valueField:'#J_CompanyValue',
			   	      	items:company
		 	        });
					select.render();
					select.setSelectedValue('0');		
	     	   	}; 
				new H.widget.asyncRequest().setURI(loadLogisticsCompaniesUrl).setMethod("POST").setHandle(sucessHandle).setData(null).send();
			},
			//列表渲染
			renderSelectItems : function(){
				var items = updateLogisticControl.groupList;
				var len = items.length;
				if (len > 0) {
					DOM.css(DOM.get('#J_REmpty'), 'display' , 'none');
					var templet = DOM.html(DOM.get('#J_Templet'));
					var data = {
			            data: items
			        };
			        var els = new XTemplate(templet).render(data);
					DOM.html(DOM.get('#J_PromotionItemList'), els );
					var item = [{text:'0.5千克以内',value:'0.5'},{text:'1千克以内',value:'1'}];
			     	for(i = 0; i < items.length; i++){	 
			     		if(updateLogisticControl.selects1[i]){
			     			updateLogisticControl.selects1[i].destroy();
			     		}
			     		if(updateLogisticControl.selects2[i]){
			     			updateLogisticControl.selects2[i].destroy();
			     		}
			     		if(updateLogisticControl.selects3[i]){
			     			updateLogisticControl.selects3[i].destroy();
			     		}
			     		updateLogisticControl.selects1[i]=new Select.Select({  
	   	   		   		    render:'#J_start1Standards_'+i,
	   	   		   	      	valueField:'#J_start1Standards_v_'+i,
	   	   		   	      	items:item
	   	   		   		}).render();
			     		updateLogisticControl.selects2[i] =  new Select.Select({  
		   	   		   		    render:'#J_start2Standards_'+i,
		   	   		   	      	valueField:'#J_start2Standards_v_'+i,
		   	   		   	      	items:item
		   	   		   		}).render();
			     		updateLogisticControl.selects3[i] = new Select.Select({  
		   	   		   		    render:'#J_addStandards_'+i,
		   	   		   	      	valueField:'#J_addStandards_v_'+i,
		   	   		   	      	items:item
		   	   		   		}).render();
			      	}	   		
					
				}else{
					DOM.css(DOM.get('#J_REmpty') ,'display','');
				}
			},
			
			initAreasDialog : function(){
   				if(!updateLogisticControl.areasDialog){
		   			updateLogisticControl.areasDialog = new Overlay.Dialog({
		   				title : '添加地区',
						width : 480,
						height : 680,
						mask:true,
						elAttrs :{id : ''}, 
						bodyStyle : {'padding':0},
						footerStyle :{'display' : 'none'}
	   			   	})
		   			var str = '<div class="pop-area"  style="padding:20px" id="J_areaList">'+
					'<div class="fast-area">'+
						'<a id="J_allArea">全选</a><a id="J_theArea">反选</a><a id="J_hotArea">江浙泸</a>'+
					'</div>'+
					'<div class="pop-area-list">'+
						'<ul>'+
							'<li id="J_hd">'+
								'<label class="beautify_check" for="J_sortHd"><input type="checkbox" value="Hd" id="J_sortHd" class="J_areaSort"><b>华东</b></label>'+
								'<label class="beautify_check" for="J_310000"><input pid="310000" value="上海" type="checkbox" id="J_310000" class="J_areaItem">上海</label>'+
								'<label class="beautify_check" for="J_320000"><input pid="320000" value="江苏" type="checkbox" id="J_320000" class="J_areaItem">江苏</label>'+
								'<label class="beautify_check" for="J_330000"><input pid="330000" value="浙江" type="checkbox" id="J_330000" class="J_areaItem">浙江</label>'+
								'<label class="beautify_check" for="J_350000"><input pid="350000" value="福建" type="checkbox" id="J_350000" class="J_areaItem">福建</label>'+
								'<label class="beautify_check" for="J_340000"><input pid="340000" value="安徽" type="checkbox" id="J_340000" class="J_areaItem">安徽</label>'+
								'<label class="beautify_check" for="J_360000"><input pid="360000" value="江西" type="checkbox" id="J_360000" class="J_areaItem">江西</label>'+
							'</li>'+
							'<li id="J_hb">'+
								'<label class="beautify_check" for="J_sortHb"><input type="checkbox" value="Hb" id="J_sortHb" class="J_areaSort"><b>华北</b></label>'+
								'<label class="beautify_check" for="J_110000"><input pid="110000" value="北京" type="checkbox" id="J_110000" class="J_areaItem">北京</label>'+
								'<label class="beautify_check" for="J_120000"><input pid="120000" value="天津" type="checkbox" id="J_120000" class="J_areaItem">天津</label>'+
								'<label class="beautify_check" for="J_130000"><input pid="130000" value="河北" type="checkbox" id="J_130000" class="J_areaItem">河北</label>'+
								'<label class="beautify_check" for="J_370000"><input pid="370000"  value="山东"type="checkbox" id="J_370000" class="J_areaItem">山东</label>'+
								'<label class="beautify_check" for="J_140000"><input pid="140000" value="山西" type="checkbox" id="J_140000" class="J_areaItem">山西</label>'+
								'<label class="beautify_check" for="J_150000"><input pid="150000" value="内蒙古" type="checkbox" id="J_150000" class="J_areaItem">内蒙古</label>'+
							'</li>'+
							'<li id="J_hn">'+
								'<label class="beautify_check" for="J_sortHn"><input type="checkbox" value="Hn" id="J_sortHn" class="J_areaSort"><b>华南</b></label>'+
								'<label class="beautify_check" for="J_440000"><input pid="440000" value="广东" type="checkbox" id="J_440000" class="J_areaItem">广东</label>'+
								'<label class="beautify_check" for="J_450000"><input pid="450000" value="广西" type="checkbox" id="J_450000" class="J_areaItem">广西</label>'+
								'<label class="beautify_check" for="J_460000"><input pid="460000" value="海南" type="checkbox" id="J_460000" class="J_areaItem">海南</label>'+
							'</li>'+
							'<li id="J_hz">'+
								'<label class="beautify_check" for="J_sortHz"><input type="checkbox" value="Hz" id="J_sortHz" class="J_areaSort"><b>华中</b></label>'+
								'<label class="beautify_check" for="J_410000"><input pid="410000" value="河南" type="checkbox" id="J_410000" class="J_areaItem">河南</label>'+
								'<label class="beautify_check" for="J_420000"><input pid="420000" value="湖北" type="checkbox" id="J_420000" class="J_areaItem">湖北</label>'+
								'<label class="beautify_check" for="J_430000"><input pid="430000" value="湖南" type="checkbox" id="J_430000" class="J_areaItem">湖南</label>'+
							'</li>'+
							'<li id="J_db">'+
								'<label class="beautify_check" for="J_sortDb"><input type="checkbox" value="Db" id="J_sortDb" class="J_areaSort"><b>东北</b></label>'+
								'<label class="beautify_check" for="J_210000"><input pid="210000" value="辽宁" type="checkbox" id="J_210000" class="J_areaItem">辽宁</label>'+
								'<label class="beautify_check" for="J_220000"><input pid="220000" value="吉林" type="checkbox" id="J_220000" class="J_areaItem">吉林</label>'+
								'<label class="beautify_check" for="J_230000"><input pid="230000" value="黑龙江" type="checkbox" id="J_230000" class="J_areaItem">黑龙江</label>'+
							'</li>'+
							'<li id="J_xn">'+
								'<label class="beautify_check" for="J_sortXn"><input type="checkbox" value="Xn" id="J_sortXn" class="J_areaSort"><b>西南</b></label>'+
								'<label class="beautify_check" for="J_500000"><input pid="500000" type="checkbox" value="重庆" id="J_500000" class="J_areaItem">重庆</label>'+
								'<label class="beautify_check" for="J_510000"><input pid="510000" type="checkbox" value="四川" id="J_510000" class="J_areaItem">四川</label>'+
								'<label class="beautify_check" for="J_520000"><input pid="520000" type="checkbox" value="贵州" id="J_520000" class="J_areaItem">贵州</label>'+
								'<label class="beautify_check" for="J_530000"><input pid="530000" type="checkbox" value="云南" id="J_530000" class="J_areaItem">云南</label>'+
							'</li>'+
							'<li id="J_xb">'+
								'<label class="beautify_check" for="J_sortXb"><input type="checkbox" value="Xb" id="J_sortXb" class="J_areaSort"><b>西北</b></label>'+
								'<label class="beautify_check" for="J_610000"><input pid="610000" type="checkbox" value="陕西" id="J_610000" class="J_areaItem">陕西</label>'+
								'<label class="beautify_check" for="J_620000"><input pid="620000" type="checkbox" value="甘肃" id="J_620000" class="J_areaItem">甘肃</label>'+
								'<label class="beautify_check" for="J_630000"><input pid="630000" type="checkbox" value="青海" id="J_630000" class="J_areaItem">青海</label>'+
								'<label class="beautify_check" for="J_640000"><input pid="640000" type="checkbox" value="宁夏" id="J_640000" class="J_areaItem">宁夏</label>'+
							'</li>'+
						'</ul>'+
					'</div>'+
					'<div class="pop-area-other">'+
						'<ul>'+
							'<li id="J_qt">'+
								'<label class="beautify_check" for="J_sortQt"><input type="checkbox" value="Qt" id="J_sortQt" class="J_areaSort"><b>其他</b></label>'+
								'<label class="beautify_check" for="J_540000"><input type="checkbox" pid="540000" value="西藏" id="J_540000" class="J_areaItem">西藏</label>'+
								'<label class="beautify_check" for="J_650000"><input type="checkbox" pid="650000" value="新疆" id="J_650000" class="J_areaItem">新疆</label>'+
								'<label class="beautify_check" for="J_810000"><input type="checkbox" pid="810000" value="香港" id="J_810000" class="J_areaItem">香港</label>'+
								'<label class="beautify_check" for="J_820000"><input type="checkbox" pid="820000" value="澳门" id="J_820000" class="J_areaItem">澳门</label>'+
								'<label class="beautify_check" for="J_710000"><input type="checkbox" pid="710000" value="台湾" id="J_710000" class="J_areaItem">台湾</label>'+
								'<label class="beautify_check" for="J_990000"><input type="checkbox" pid="990000" value="海外" id="J_990000" class="J_areaItem">海外</label>'+
							'</li>'+
						'</ul>'+
					'</div>'+
					'<div id="J_logistics_pop">'+
					'<ul>'+
						'<li class="x-pop-element" class="min-height-30 fl" style="width:100%;">'+
				           '<div class="w-60 fl" style="text-align:center;">首重:</div>'+
				           '<div class="fl ml6" id="J_s1" style="margin-right:6px;"><input type="hidden" id="hide4" value="" name="s1"/></div>'+
					   		'<div class="fl ml6">'+
					   		'<input type="text" value="" name="amount_1" class="input-text-2" style="width:50px;"/ id="J_firstMoney">&nbsp;&nbsp;元'+
				          ' </li>'+
				           ' <li class="x-pop-element" class="min-height-30 fl" style="width:100%;">'+
				                  '<div class="w-60 align-right fl">&nbsp;</div>'+
				                  ' <div class="fl ml6">'+
				                  	'<a id="J_fir_Standar">+添加首费标准</a><div id="J_Standar2" style="display:none;"><div id="J_s3" style="display:none;float:left;margin-right:12px;"><input type="hidden" value="" id="hide6"/></div><input type="text" value="" name="amount_1" class="input-text-2" style="width:50px;" id="J_add"/>&nbsp;&nbsp;元<a style="margin-left:5px;" class="J_clear">删除</a></div>'+
				                  '</div>'+
				          ' </li>'+
				          ' <li class="x-pop-element" class="min-height-30 fl" style="width:100%;">'+
				           '<div class="w-60 fl" style="text-align:center;">续重:</div>'+
				            '<div class="fl ml6" id="J_s2" style="margin-right:6px;"><input type="hidden" id="hide5" value="" name="s2"/>'+   
				   		'</div>'+
				   		'<div class="fl ml6">'+
				          ' <input type="text" value="" name="amount_1" class="input-text-2" style="width:50px;" id="J_addStandar"/>&nbsp;&nbsp;元'+
				          '</div>'+	
				           '</li>'+
				           '<li  class="fl"  style="width:450px;line-height:0;min-height:0;margin-bottom:0;">'+
					        '<div id="J_Suggest_ParamsErrorBox" style="display: none; width:450px;" class="ui-msg mt15">'+
							'<div class="error-msg"><div class="img-16-1"></div>'+
							'<div id="J_Suggest_ParamsErrorMsg" class="text-16 color-red">内容不能为空</div></div>'+
							'</div>'+
							'<div id="J_Suggest_ParamsSucessBox" style="display: none;width:450px;" class="ui-msg mt15">'+
						    '<div class="success-msg"><div class="img-16-6"></div></div>'+
				       '</li>'+
				           '</ul>'+
	               '</div>'+
				'</div>';
		   		 str	+='<div class="bui-stdmod-footer"><button class="bui-button bui-button-primary" id="J_AreasSubmit" >确定</button><button class="bui-button" id="J_AreasCancle">关闭</button></div></div>'
		   		 updateLogisticControl.areasDialog.set('title','新建模板');
	   			 updateLogisticControl.areasDialog.set('bodyContent',str);
	   			 updateLogisticControl.areasDialog.render();
	   			var items4 = [{text:'0.5千克以内',value:'0.5'},{text:'1千克以内',value:'1'}];
			    new Select.Select({  
			   	   	 render:'#J_s1',
			   	   	 valueField:'#hide4',
			   	   	 items:items4
			   	   	}).render().setSelectedValue('0.5');
			   new Select.Select({  
			   	   		 render:'#J_s2',
			   	   		 valueField:'#hide5',
			   	   		 items:items4
			   	   	}).render().setSelectedValue('0.5');
			   new Select.Select({  
			   	   		 render:'#J_s3',
			   	   		 valueField:'#hide6',
			   	   		 items:items4
			   	   	}).render().setSelectedValue('0.5');	
				
			   updateLogisticControl.x.renderAllCheckbox('#J_areaList');
			     Event.on('.J_clear','click',function(){
  					DOM.show('#J_fir_Standar');
	   				DOM.hide('#J_Standar2');
	   				DOM.hide('#J_s3');
  				 });
				 Event.on('#J_fir_Standar','click',function(){ 
	   				DOM.hide('#J_fir_Standar');
	   				DOM.show('#J_Standar2');
	   				DOM.show('#J_s3');
			       })
				//全选
				Event.on('#J_allArea','click',function(){
					var checkBoxs =  DOM.filter (DOM.query('#J_areaList'+' input'),function(i){if(i.type =='checkbox')return true;});
					for(var i = 0,len =  checkBoxs.length; i < len; i++){
						updateLogisticControl.x.setCheckboxOn(checkBoxs[i]);
					}
				})
				//反选
				Event.on('#J_theArea','click',function(){
					var checkBoxs =  DOM.filter (DOM.query('#J_areaList'+' input'),function(i){if(i.type =='checkbox')return true;});
					for(var i = 0,len =  checkBoxs.length; i < len; i++){
						if(checkBoxs[i].checked){
							updateLogisticControl.x.setCheckboxOff(checkBoxs[i]);
						}else{
							updateLogisticControl.x.setCheckboxOn(checkBoxs[i]);
						}
					}
				})
				//江浙泸
				Event.on('#J_hotArea','click',function(){
					var checkBoxs =  DOM.filter (DOM.query('#J_areaList'+' input'),function(i){if(i.type =='checkbox')return true;});
					for(var i = 0; i < checkBoxs.length; i++){
						updateLogisticControl.x.setCheckboxOff(checkBoxs[i]);
					}
					updateLogisticControl.x.setCheckboxOn('#J_310000');
					updateLogisticControl.x.setCheckboxOn('#J_320000');
					updateLogisticControl.x.setCheckboxOn('#J_330000');
				})
				//华东
				Event.on('#J_sortHd','click',function(ev){
					updateLogisticControl.checkAll('#J_hd','#J_sortHd');
				})
				Event.on(DOM.query('#J_hd .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_hd .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortHd'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortHd'));
	        		}
	        	})
	        	
	        	//华东
				Event.on('#J_sortHb','click',function(ev){
					updateLogisticControl.checkAll('#J_hb','#J_sortHb');
				})
				Event.on(DOM.query('#J_hb .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_hb .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortHb'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortHb'));
	        		}
	        	})
	        	
	        	//华南
				Event.on('#J_sortHn','click',function(ev){
					updateLogisticControl.checkAll('#J_hn','#J_sortHn');
				})
				Event.on(DOM.query('#J_hn .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_hn .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortHn'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortHn'));
	        		}
	        	})
	        	
	        	//华中
				Event.on('#J_sortHz','click',function(ev){
					updateLogisticControl.checkAll('#J_hz','#J_sortHz');
				})
				Event.on(DOM.query('#J_hz .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_hz .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortHz'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortHz'));
	        		}
	        	})
	        				        	
	        	//东北
				Event.on('#J_sortDb','click',function(ev){
					updateLogisticControl.checkAll('#J_db','#J_sortDb');
				})
				Event.on(DOM.query('#J_db .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_db .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortDb'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortDb'));
	        		}
	        	})
	        	
	        	//西南
				Event.on('#J_sortXn','click',function(ev){
					updateLogisticControl.checkAll('#J_xn','#J_sortXn');
				})
				Event.on(DOM.query('#J_xn .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_xn .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortXn'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortXn'));
	        		}
	        	})
	        	
	        	//西北
				Event.on('#J_sortXb','click',function(ev){
					updateLogisticControl.checkAll('#J_xb','#J_sortXb');
				})
				Event.on(DOM.query('#J_xb .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_xb .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortXb'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortXb'));
	        		}
	        	})
	        	
	        	//其他
				Event.on('#J_sortQt','click',function(ev){
					updateLogisticControl.checkAll('#J_qt','#J_sortQt');
				})
				Event.on(DOM.query('#J_qt .J_areaItem'),'click',function(ev){
	        		if(this.checked){
	        			var checkBoxs = DOM.query("#J_qt .J_areaItem");
	        			var len = checkBoxs.length;
	        			var allFlag = true;
	        			for(i=0; i<len; i++){
							if(checkBoxs[i].disabled) continue;
							if(!checkBoxs[i].checked){
								allFlag = false;
								break;
							} 
						}
	        			if(allFlag){
							updateLogisticControl.x.setCheckboxOn(DOM.get('#J_sortQt'));
	        			}
	        		}else{
	        			updateLogisticControl.x.setCheckboxOff(DOM.get('#J_sortQt'));
	        		}
	        	})
	        	// 确定
	        	Event.on('#J_AreasSubmit','click',function(ev){
	        		  // 1 为编辑地区
	        		if(updateLogisticControl.type == 1){
	        			updateLogisticControl.updateAreas();
	        		}else{
	        			updateLogisticControl.createTemplet();
	        			
	        		}
				})
	        	// 取消
	        	Event.on('#J_AreasCancle','click',function(ev){
	        		updateLogisticControl.areasDialog.hide()
				})
	        	
			}else{
   				updateLogisticControl.areasDialog.show();
		 	}
	
		},
		 //地址勾选
       checkAll : function(id,checkedId) {
	   		var checkBoxs = DOM.query('.J_areaItem',id);				
	   		var len = checkBoxs.length;
	   		for(i=0; i<len; i++){
	   			var iid = checkBoxs[i].value;
	   			if(checkBoxs[i].disabled) continue;
	   			if(DOM.get(checkedId).checked == true){
	   				updateLogisticControl.x.setCheckboxOn(checkBoxs[i]);
	   			} else {
	   				updateLogisticControl.x.setCheckboxOff(checkBoxs[i]);
	   			}
	   		  }
	   		
     	},
     	 //编辑地区
     	updateAreas : function(){
     		 	var areaInput = DOM.query('#J_areaList .J_areaItem');
     		 	var len = areaInput.length;
	     	    var arr = [];
	     	    var ids = [];
	     	    var noArr = [];
	     	    var noIds = [];
	     	    var str = '';
	     	   	for(var i = 0; i < len; i++){
	     	   		if(areaInput[i].disabled) continue;
	     	   		if(areaInput[i].checked == true){
	     	   			arr.push(areaInput[i].value);
	     	   			str += '&nbsp;<span>'+areaInput[i].value+'</span>&nbsp;';
	     	   			ids.push(DOM.attr(areaInput[i],'pid'));
	     	   		}else{
	     	   			noArr.push(areaInput[i].value);
	     	   			noIds.push(DOM.attr(areaInput[i],'pid'));
	     	   		}
	     	   	} 
	     	   updateLogisticControl.groupList[updateLogisticControl.index].areas = ids;
	     	   DOM.html('#J_AreasBox'+updateLogisticControl.index,str);
	     	   updateLogisticControl.areasDialog.hide();
	     	   	
     	} ,
     	 //创建模板
     	createTemplet : function(){
     		 	var areaInput = DOM.query('#J_areaList .J_areaItem');
     		 	var len = areaInput.length;
	     	    var arr = [];
	     	    var ids = [];
	     	    var noArr = [];
	     	    var noIds = [];
	     	   	for(var i = 0; i < len; i++){
	     	   		if(areaInput[i].disabled) continue;
	     	   		if(areaInput[i].checked == true){
	     	   			arr.push(areaInput[i].value);
	     	   			ids.push(DOM.attr(areaInput[i],'pid'));
	     	   		}else{
	     	   			noArr.push(areaInput[i].value);
	     	   			noIds.push(DOM.attr(areaInput[i],'pid'));
	     	   		}
	     	   	}   
	     		var start1_standards=DOM.val('#hide4');
				var start1_fees=DOM.val('#J_firstMoney');
				var	start2_standards=DOM.val('#hide6');
				var start2_fees=DOM.val('#J_add') || 0;
				var add_standards=DOM.val('#hide5');
				var add_fees=DOM.val('#J_addStandar');
				var idNum=ids.join(',');
				
				var sucessHandle = function(o){
					DOM.val('#J_firstMoney','');
					DOM.val('#J_addStandar','');
		     	   		var obj = {
		     	   			    "detail_id":o.payload.items, 
		     	   				"add_fees":add_fees,
			     	   			"add_standards": add_standards,
			     	     	    "areas": ids,
			     	     	    "start1_fees": start1_fees,
			     	     	    "start1_standards": start1_standards,
			     	     	    "start2_fees": start2_fees,
			     	     	    "start2_standards": start2_standards
		     	   		}
		     	   		updateLogisticControl.groupList.push(obj);
		     	   		updateLogisticControl.renderSelectItems();
		     	   	    
			     	   	
		     	   	}; 
		     	   ParamsErrorBox = KISSY.one('#J_Suggest_ParamsErrorBox');
		     	   if(ids == "" || ids == "undefined"){
		   	    		DOM.html('#J_Suggest_ParamsErrorMsg','地区不能为空');
		   	    		if (ParamsErrorBox.css("display")==="none") {
		   	    			ParamsErrorBox.slideDown();														
							}
		   	    		S.later(function(){
		   	    			DOM.hide('#J_Suggest_ParamsErrorBox');
							},2000,false);
							return;
						}
		     	if(!isNaN(start1_fees)){
      	    	}else{
      	    		DOM.html('#J_Suggest_ParamsErrorMsg','首费金额必须是数字');
	    	    		if (ParamsErrorBox.css("display")==="none") {
	    	    			ParamsErrorBox.slideDown();														
						}
	    	    		S.later(function(){
	    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
						},2000,false);
						return;
      	    	}
	        	    if(start1_fees == "" || start1_fees == "undefined"){
	    	    		DOM.html('#J_Suggest_ParamsErrorMsg','首费金额不能为空');
	    	    		if (ParamsErrorBox.css("display")==="none") {
	    	    			ParamsErrorBox.slideDown();														
						}
	    	    		S.later(function(){
	    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
						},2000,false);
						return;
					}
	        	    if(start1_fees<0){
	    	    		DOM.html('#J_Suggest_ParamsErrorMsg','首费金额不允许小于0');
	    	    		if (ParamsErrorBox.css("display")==="none") {
	    	    			ParamsErrorBox.slideDown();														
						}
	    	    		S.later(function(){
	    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
						},2000,false);
						return;
					}
		       	    
		       	    if(isNaN(start2_fees)||start2_fees<0){
		       	    	if (start2_fees<0){
		       	    		DOM.html('#J_Suggest_ParamsErrorMsg','金额2填写不正确');
		       	    	}else{
		       	    		DOM.html('#J_Suggest_ParamsErrorMsg','首费金额必须是数字');
		       	    	}
		       	    	if(ParamsErrorBox.css("display")==="none") {
		   	    			ParamsErrorBox.slideDown();														
							}
		   	    		S.later(function(){
		   	    			DOM.hide('#J_Suggest_ParamsErrorBox');
							},2000,false);
							return;
					}
		       	 if(!isNaN(add_fees)){
     	    	}else{
     	    		DOM.html('#J_Suggest_ParamsErrorMsg','续费金额必须是数字');
	    	    		if (ParamsErrorBox.css("display")==="none") {
	    	    			ParamsErrorBox.slideDown();														
						}
	    	    		S.later(function(){
	    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
						},2000,false);
						return;
     	    	}
	        	    if(add_fees == ""){
	    	    		DOM.html('#J_Suggest_ParamsErrorMsg','续费金额不能为空');
	    	    		if (ParamsErrorBox.css("display")==="none") {
	    	    			ParamsErrorBox.slideDown();														
						}
	    	    		S.later(function(){
	    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
						},2000,false);
						return;
					}
	        	    if(add_fees<0){
	    	    		DOM.html('#J_Suggest_ParamsErrorMsg','续费金额不允许小于0');
	    	    		if (ParamsErrorBox.css("display")==="none") {
	    	    			ParamsErrorBox.slideDown();														
						}
	    	    		S.later(function(){
	    	    			DOM.hide('#J_Suggest_ParamsErrorBox');
						},2000,false);
						return;
					}
	       	   updateLogisticControl.areasDialog.hide();
	     	   var data ='areas='+idNum+'&start1_standards='+start1_standards+'&start1_fees='+start1_fees+'&start2_standards='+start2_standards+'&start2_fees='+start2_fees+'&add_standards='+add_standards+'&add_fees='+add_fees;
 			   new H.widget.asyncRequest().setURI(addLogisticsDetailUrl).setMethod("POST").setHandle(sucessHandle).setData(data).send();
     	},
     	
     	tempSave: function(){
			var items = updateLogisticControl.groupList;
			var len = items.length;
	     	for(i = 0; i < len; i++){	 
	     		items[i].start1_standards=DOM.val('#J_start1Standards_v_'+i);
	     		items[i].start1_fees=DOM.val('#J_start1Fees_'+i);
				items[i].start2_standards=DOM.val('#J_start2Standards_v_'+i);
				items[i].start2_fees=DOM.val('#J_start2Fees_'+i);
				items[i].add_standards=DOM.val('#J_addStandards_v_'+i);
				items[i].add_fees =DOM.val('#J_addFees_'+i);
	      	}
	     	return items;
		}
		
    
	}

},{
    requires: ['utils/showPages/index','utils/beautifyForm/index','bui/select','bui/overlay','gallery/province/1.0/index','xtemplate']
});