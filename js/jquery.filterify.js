	(function($){
		$.fn.filterify = function(parameters){
			return this.each(function() {
				var fieldsArray = new Array();
				var fieldsValues = new Array();
				var fields = new Array();
				var activeFilters = new Array();
				var columnsIds = new Array();
				var pattern = /between-[0-9]+-[1-9]+/g;
				if($(this).is('table')){
					var table = $(this);
					if(parameters != undefined){
						if(parameters.columns == undefined){
							parameters.columns = 'all';
						}
						if(parameters.emptyValue == undefined){
							parameters.emptyValue = 'Show everything';
						}
					}else{
						parameters = {columns:'all',emptyValue:'Show everything'}
					}
	
					switch(true){
						case parameters.columns=='all':
							var head = $(this).find('tr').first();
							if(head.find('td').length > 0){
								head.find('td').each(function(index){
									columnsIds.push(index);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}else{
								head.find('th').each(function(index){
									columnsIds.push(index);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}
						break;
						case parameters.columns=='except-first':
							var head = $(this).find('tr').first();
							if(head.find('td').length > 0){
								head.find('td:gt(0)').each(function(index){
									columnsIds.push(index+1);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}else{
								head.find('th:gt(0)').each(function(index){
									columnsIds.push(index+1);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}
						break;
						case parameters.columns=='except-last':
							var head = $(this).find('tr').first();
							if(head.find('td').length > 0){
								head.find('td:lt('+(head.find('td').length-1)+')').each(function(index){
									columnsIds.push(index);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}else{
								head.find('th:lt('+(head.find('th').length-1)+')').each(function(index){
									columnsIds.push(index);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}
						break;
						case parameters.columns=='except-first-and-last':
							var head = $(this).find('tr').first();
							if(head.find('td').length > 0){
								head.find('td:lt('+(head.find('td').length-1)+'):gt(0)').each(function(index){
									columnsIds.push(index+1);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}else{
								head.find('th:lt('+(head.find('th').length-1)+'):gt(0)').each(function(index){
									columnsIds.push(index+1);
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}
						break;
						case pattern.test(parameters.columns):
							var head = $(this).find('tr').first();							
							var numbers = parameters.columns.substr(8);
							numbers = numbers.split('-').map(Number);
							if(head.find('td').length > 0){
								head.find('td:lt('+numbers[1]+'):gt('+numbers[0]+')').each(function(index){
									columnsIds.push(index+(numbers[0]+1));
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}else{
								head.find('th:lt('+numbers[1]+'):gt('+numbers[0]+')').each(function(index){
									columnsIds.push(index+(numbers[0]+1));
									fieldsArray.push($(this));
									fieldsValues.push(new Array());
									fields.push(new Array());
									activeFilters.push('all');
								});
							}
						break;
						default:							
							var filterablyIndex = parameters.columns.split(",").map(Number);	
							var pattern = /[0-9,]+/g;			
							if(pattern.test(parameters.columns)){								
								var head = $(this).find('tr').first();
								if(head.find('td').length > 0){
									head.find('td').each(function(index){								
										if($.inArray(index+1,filterablyIndex)>=0){
											columnsIds.push(index);
											fieldsArray.push($(this));
											fieldsValues.push(new Array());
											fields.push(new Array());
											activeFilters.push('all');
										}
									});
								}else{
									head.find('th').each(function(index){								
										if($.inArray(index+1,filterablyIndex)>=0){
											columnsIds.push(index);
											fieldsArray.push($(this));
											fieldsValues.push(new Array());
											fields.push(new Array());
											activeFilters.push('all');
										}
									});
								}
							}else{
								var head = this.find('tr').first();
								if(head.find('td').length > 0){
									head.find('td').each(function(index){
										columnsIds.push(index);
										fieldsArray.push($(this));
										fieldsValues.push(new Array());
										fields.push(new Array());
										activeFilters.push('all');
									});
								}else{
									head.find('th').each(function(index){
										columnsIds.push(index);
										fieldsArray.push($(this));
										fieldsValues.push(new Array());
										fields.push(new Array());
										activeFilters.push('all');
									});
								}
							}
						break;
					}
	
					var fieldsIndex = 1;
					 $(this).find('tr:gt(0)').each(function(){
						var outerIndex = 0;
						var tr = $(this);
						$(this).find('td').each(function(index){
							if($.inArray(index,columnsIds)>=0){
								fieldsValues[outerIndex].push($(this).text());
								if(fields[outerIndex][$(this).text()] == undefined){
									fields[outerIndex][$(this).text()] = 'filterify-'+fieldsIndex;									
									fieldsIndex++;
									tr.addClass(fields[outerIndex][$(this).text()]);
								}else{
									tr.addClass(fields[outerIndex][$(this).text()]);
								}
								outerIndex++;
							}														
						});
					});
					
	
					for(var i=0;i<fieldsArray.length;i++){
						fieldsArray[i].append('<select class="filterify-select" rel="'+i+'"><option value="all">'+parameters.emptyValue+'</option></select>');
						var values = fieldsValues[i];
						values.sort(naturalSort);
						for(var j=0;j<fieldsValues[i].length;j++){
							var found = false;
							fieldsArray[i].find('select').first().find('option').each(function(){
								if($(this).val()==fields[i][fieldsValues[i][j]]){
									found =true;
									return false;
								}
							});
							if(!found){
								fieldsArray[i].find('select').first().append('<option value="'+fields[i][fieldsValues[i][j]]+'">'+fieldsValues[i][j]+'</option>');
							}
						}
					}
	
					 $(this).find('select').each(function(){
						$(this).change(function(){
							var value = $(this).val();
							activeFilters[$(this).attr('rel')] = value;
							var displayEverything = true;
							for(var i =0;i<activeFilters.length;i++){
								if(activeFilters[i] != 'all'){
									displayEverything=false;
									break;	
								}
							}
							
							if(displayEverything){
								table.find('tr:gt(0)').each(function(){
									$(this).css('display','table-row');
								});
							}else{
								table.find('tr:gt(0)').each(function(){
									var displayRow = true;
									for(var i=0;i<activeFilters.length;i++){
										if(activeFilters[i] != 'all'){
											if(!$(this).hasClass(activeFilters[i])){
												displayRow = false;
												break;
											}
										}
									}
									if(displayRow){
										$(this).css('display','table-row');
									}else{
										$(this).css('display','none');
									}
								});
							}
						});
					});
				}
			});
		}
	}(jQuery));