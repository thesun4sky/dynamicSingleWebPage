	var jsonTicketInfo= {
			'SeatList':[
				{"Zone":"N-Zone","SeatCode":"NFR","SeatName":"E/N 자유석", "Limited" : 9, "DiscountType": "A", 'Ticket':[{"Code":1,"Name":"성인","Price":14000},{"Code":2,"Name":"청소년","Price":7000},{"Code":3,"Name":"어린이","Price":4000}]}
				, {"Zone":"E-Zone","SeatCode":"EFR","SeatName":"E/N 자유석", "Limited" : 9, "DiscountType": "A", 'Ticket':[{"Code":1,"Name":"성인","Price":14000},{"Code":2,"Name":"청소년","Price":7000},{"Code":3,"Name":"어린이","Price":4000}]}
				, {"Zone":"E-Zone","SeatCode":"ECT","SeatName":"센터석", "Limited" : 9, "DiscountType": "1", 'Ticket':[{"Code":1,"Name":"성인","Price":16000},{"Code":2,"Name":"청소년","Price":9000},{"Code":3,"Name":"어린이","Price":5000}]}
				, {"Zone":"E-Zone","SeatCode":"ETB","SeatName":"테이블석", "Limited" : 9, "DiscountType": "", 'Ticket':[{"Code":1,"Name":"2인석","Price":40000},{"Code":2,"Name":"3인석","Price":60000},{"Code":3,"Name":"4인석","Price":80000}]}
				, {"Zone":"E-Zone","SeatCode":"ECZ","SeatName":"칭따오존", "Limited" : 9, "DiscountType": "", 'Ticket':[{"Code":1,"Name":"4인석","Price":80000},{"Code":2,"Name":"6인석","Price":120000}]}
				, {"Zone":"W-Zone","SeatCode":"WFR","SeatName":"W 자유석", "Limited" : 9, "DiscountType": "1,3", 'Ticket':[{"Code":1,"Name":"성인","Price":20000},{"Code":2,"Name":"청소년","Price":20000},{"Code":3,"Name":"어린이","Price":10000}]}
				, {"Zone":"W-Zone","SeatCode":"WPR","SeatName":"프리미엄석", "Limited" : 9, "DiscountType": "1", 'Ticket':[{"Code":1,"Name":"성인","Price":40000},{"Code":2,"Name":"청소년","Price":40000},{"Code":3,"Name":"어린이","Price":40000}]}
				, {"Zone":"W-Zone","SeatCode":"WBS","SeatName":"벤치석", "Limited" : 9, "DiscountType": "1", 'Ticket':[{"Code":1,"Name":"성인","Price":30000},{"Code":2,"Name":"청소년","Price":30000},{"Code":3,"Name":"어린이","Price":20000}]}
				, {"Zone":"W-Zone","SeatCode":"WA1","SeatName":"W 지정석(1구역)", "Limited" : 9, "DiscountType": "1,3", 'Ticket':[{"Code":1,"Name":"성인","Price":22000},{"Code":2,"Name":"청소년","Price":22000},{"Code":3,"Name":"어린이","Price":12000}]}
				, {"Zone":"W-Zone","SeatCode":"WA2","SeatName":"W 지정석(2~3구역)", "Limited" : 9, "DiscountType": "1,3", 'Ticket':[{"Code":1,"Name":"성인","Price":25000},{"Code":2,"Name":"청소년","Price":25000},{"Code":3,"Name":"어린이","Price":15000}]}
				, {"Zone":"W-Zone","SeatCode":"WDS","SeatName":"데스크석", "Limited" : 9, "DiscountType": "", 'Ticket':[{"Code":1,"Name":"2인석","Price":40000}]}
			], 
			'DiscountType':[
				{"Code":1,"Name":"예매할인","Place":2,"Notice":""}
				, {"Code":2,"Name":"군인/경찰","Place":1,"Notice":"(현역) 휴가증 + 신분증<br/>(직업) 공무원증 지참"}
				, {"Code":3,"Name":"삼성카드","Place":1,"Notice":"모든 삼성카드 할인 적용<br/>*전월 이용실적에 따른 제한 없음"}
				, {"Code":4,"Name":"6대 삼성카드","Place":2,"Notice":"삼성애니패스카드, 삼성애니패스포인트카드, <br/>SFC 삼성카드, 신그룹사원증카드, <br/>르노삼성자동차카드, 공무원연금 삼성카드<br/>*일 1회, 월 2회, 연 10매 한정"}
				, {"Code":5,"Name":"삼성카드 S클래스","Place":3,"Notice":"직전 3개월 일시불 월 평균 10만원 이상 사용 시, 적용<br/>*카드발급 후 최초 1회 한정 (이후 6대 삼성카드 혜택 적용)"}
				, {"Code":6,"Name":"메가박스 멤버십","Place":1,"Notice":"메가박스 멤버십 (모바일,회원카드)"}
				, {"Code":7,"Name":"이마트 할인권","Place":1,"Notice":"이마트 5,000원 할인권"}
				, {"Code":8,"Name":"삼성 임직원","Place":1,"Notice":"사원증"}
				, {"Code":9,"Name":"문화누리카드 (스포츠 바우처)","Place":3,"Notice":""}
				, {"Code":10,"Name":"장애(경증)","Place":1,"Notice":"복지증"}
				, {"Code":11,"Name":"장애(중증)","Place":1,"Notice":"복지증"}
				, {"Code":12,"Name":"국가유공자/경로자","Place":1,"Notice":"국가유공자증,신분증 (만 65세 이상)"}
				, {"Code":13,"Name":"문화가 있는 날","Place":1,"Notice":""}
			]
		};

	function AddTicket(obj) {
		var z_code = $(obj).parent().parent().parent().parent().find(".exCostLayout").data("code");

		var zone = $('.'+ z_code);

		if(TicketLimited(z_code)) {

			var p_code = zone.find('[name="T_Place[]"]').val();
			var s_code = zone.find('[name="T_Seat[]"]').val();
			var t_code = zone.find('[name="T_Ticket[]"]').val();

			var p_name = zone.find('[name="T_Place[]"] option:selected').text();
			var s_name = zone.find('[name="T_Seat[]"] option:selected').text();
			var t_name = zone.find('[name="T_Ticket[]"] option:selected').text();

			var t_price = TicketPrice(s_code, t_code);

			var dup_flag = "N";
			var append_pos = 0;

			var  current_id = "";

			zone.find('.SelectList').children().each( function(i){
				if ($(this).data("code")==t_code) {
					dup_flag = "Y";
				} else {
					if ($(this).data("code") < t_code) current_id = $(this).attr('id');
				}
			});
			
			if (dup_flag == "Y") {
				SetTicketQty(z_code, 'P', t_code);
			} else {

				var add_list = "";
				add_list += "<li id=\""+s_code+t_code+"\" data-code=\""+t_code+"\" data-name=\""+t_name+"\" data-price=\""+t_price+"\" data-qty=\"1\">";
				add_list += "<div class=\"gridSet grid2\">";
				add_list += "<div class=\"gridItem\">";
				add_list += "<strong class=\"num\">"+p_name + " " + s_name + " " + t_name+"</strong> ";
				add_list += "<div class=\"quantityBox\">";
				add_list += "<button class=\"countMinus\" onclick=\"SetTicketQty('"+z_code+"','N', "+t_code+")\">-</button>";
				add_list += "<strong class=\"countNumber\">1</strong>";
				add_list += "<button class=\"countPlus\" onclick=\"SetTicketQty('"+z_code+"','P', "+t_code+")\">+</button>";
				add_list += "</div>";
				add_list += "</div>";
				add_list += "<div class=\"gridItem price\"><span class=\"PriceSum\">"+numberWithCommas(t_price)+"원 </span><button class=\"priceDelete\" onclick=\"RemoveTicket('"+z_code+"',this)\">삭제</button></div>";
				add_list += "</div>";
				add_list += "</li>";
				
				if(current_id) {
					zone.find('#'+current_id).after(add_list);
				} else {
					zone.find('.SelectList').append(add_list);
				}
			}

			TicketTotalPrice(z_code);
		}
	}

	function RemoveTicket(z_code, obj) {/**/

		$(obj).parent().parent().parent().remove();

		TicketTotalPrice(z_code);
	}

	function TicketPrice(s_code, t_code) {/**/
		RecordList = jsonTicketInfo["SeatList"];
		var Price = 0;

		for (var s = 0; s < RecordList.length; s++){
			var SeatsList = RecordList[s];

			if (SeatsList["SeatCode"] == s_code) {

				var TicketList = SeatsList["Ticket"];

				for (var t = 0; t < TicketList.length; t++){
					var Ticket = TicketList[t];
					if (Ticket["Code"] == t_code) {
						Price = Ticket["Price"];
					}
				}
			}
		}
		return Price;
	}

	function SetTicketQty(z_code, t, t_code) {/**/
		var zone = $('.'+ z_code);

		zone.find('.SelectList').children().each( function(){

			if ($(this).data("code")==t_code) {

				var qty = $(this).data("qty");
				var price = $(this).data("price");

				if(t=="P") {
					if(TicketLimited(z_code)) qty++;
				} else if (t=="N") {
					qty--;
				}

				if(qty > 1) {
					$(this).data("qty",qty);
				} else {
					qty =1;
					$(this).data("qty",1);
				}

				$(this).find(".countNumber").html(qty);

				$(this).find('.PriceSum').html(numberWithCommas(qty*price)+"원");

				TicketTotalPrice(z_code);

			};
		});
	}

	function TicketLimited(z_code) {/**/

		var zone = $('.'+ z_code);
		var s_code = zone.find('[name="T_Seat[]"]').val();

		var RecordList = jsonTicketInfo["SeatList"];

		for (var s = 0; s < RecordList.length; s++){
			var SeatsList = RecordList[s];

			var LimitedQty = 9;

			if (SeatsList["SeatCode"] == s_code) {
				LimitedQty = SeatsList["Limited"];
			}
		}

		var total_qty = zone.find('.SelectList').data("totalqty");

		if(LimitedQty > total_qty) {
			return true;
		} else {
			return false;
		}
	}

	function TicketTotalPrice(z_code) {/**/

		var zone = $('.'+ z_code);

		var qty = 0;
		var total_qty = 0;
		var total_price = 0;

		var add_list = "";

		var parents_flag = false;
		var children_flag = false;

		var s_code = zone.find('[name="T_Seat[]"]').val();

		zone.find('.SelectList').children().each( function(){
			total_qty += $(this).data("qty");
			total_price += $(this).data("price")*$(this).data("qty");

			if($(this).data("code") == 1) parents_flag = true;
			if($(this).data("code") == 2 || $(this).data("code") == 3) children_flag = true;

			add_list += "<li>"+$(this).find(".num").text() +" : "+ $(this).find(".countNumber").text()+" 매</li>";
		});

		zone.find('.SelectList').data("totalqty",total_qty);
		zone.find('.SelectList').data("totalprice",total_price);

		zone.find('.exCost1_price').html(numberWithCommas(total_price)+"원");

		zone.find('.SelectList2').html(add_list);
		zone.find('.exCost2_price').html(numberWithCommas(total_price)+"원");

		SeatDataBlank(z_code,1);

		if(parents_flag==true && children_flag==true) {
			Redraw_Discount(z_code,"F");
		} else {
			Redraw_Discount(z_code,"");
		}

		zone.find('.SelectList3').html(add_list);

		zone.find('.exCost3_price').html(numberWithCommas(total_price)+"원");

	}

	function Redraw_Discount(z_code,family) {/**/

		var zone = $('.'+ z_code);

		var s_code = zone.find('[name="T_Seat[]"]').val();
		var p_code = zone.find('[name="T_Place[]"]').val();

		var total_qty = zone.find('.SelectList').data("totalqty");
		total_qty = parseInt(total_qty);
		var adult_qty = 0;

		var SelectList = zone.find('.SelectList').children();
		for (var s = 0; s < SelectList.length; s++){
			var SelectData = SelectList.eq(s);

			t_code = SelectData.data("code");
			if (t_code==1) adult_qty++;
		}


		var SeatsList = jsonTicketInfo["SeatList"];
		var DiscountList = jsonTicketInfo["DiscountType"];

		var option = "<option value='0'>할인 종류 선택</option>";

		for (var s = 0; s < SeatsList.length; s++){
			var SeatsData = SeatsList[s];

			if (SeatsData["SeatCode"] == s_code) {

				var DiscountType = SeatsData["DiscountType"];

				if(DiscountType=="A") {

					for (var j = 0; j < DiscountList.length; j++){
						var DiscountData = DiscountList[j];
						
						if (DiscountData["Place"] == p_code || DiscountData["Place"] == 3 ) {
							if(DiscountData["Code"] == 13) {
								if(family=="F") option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
                			} else {
                				if(DiscountData["Code"] == 11) {
	                				if(total_qty > 1) {
			                			option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
			                		}
                				} else if(DiscountData["Code"] == 2 || DiscountData["Code"] == 7 || DiscountData["Code"] == 8 || DiscountData["Code"] == 12) {
	                				if(adult_qty > 0) {
			                			option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
			                		}
                				} else {
		                			option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
		                		}
                			}
						}
					}

				} else if(DiscountType != "") {

					var DisSplit = DiscountType.split(',');

					for (var k in DisSplit ) {
						
						for (var j = 0; j < DiscountList.length; j++){
							var DiscountData = DiscountList[j];
							
							if (DiscountData["Code"] == DisSplit[k] && (DiscountData["Place"] == p_code || DiscountData["Place"] == 3) ) {

								if(DiscountData["Code"] == 13) {
									if(family=="F") option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
	                			} else {
	                				if(DiscountData["Code"] == 11) {
		                				if(total_qty > 1) {
				                			option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
				                		}
	                				} else if(DiscountData["Code"] == 2 || DiscountData["Code"] == 7 || DiscountData["Code"] == 8 || DiscountData["Code"] == 12) {
		                				if(adult_qty > 0) {
				                			option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
				                		}
	                				} else {
			                			option += "<option value='"+DiscountData["Code"]+"'>"+DiscountData["Name"]+"</option>";
			                		}
	                			}
							}
						}
					}
				}

			}

		}

		zone.find('[name="discount[]"]').html(option);
	}

	function Redraw_Seat(z_code) {/**/

		var zone = $('.'+ z_code);

		var SeatsList = jsonTicketInfo["SeatList"];

		var option1 ="";
		var option2 ="";

		for (var s = 0; s < SeatsList.length; s++){

			var SeatsData = SeatsList[s];

			if (SeatsData["Zone"] == z_code) {

				var s_code = SeatsData["SeatCode"];

             	option1 += "<option value='"+s_code+"'>"+SeatsData["SeatName"]+"</option>";

				option2 ="";

				if (s==0) {

					var TicketList = SeatsData["Ticket"];

					for (var t = 0; t < TicketList.length; t++){
						var TicketData = TicketList[t];

		             	option2 += "<option value='"+TicketData["Code"]+"'>"+TicketData["Name"]+"</option>";
					}

					zone.find('[name="T_Ticket[]"]').html(option2);
	            }
            }
		}

		zone.find('[name="T_Seat[]"]').html(option1);

	}

	function Redraw_Ticket(z_code) {/**/

		var zone = $('.'+ z_code);

		var s_code = zone.find('[name="T_Seat[]"]').val();

		var SeatsList = jsonTicketInfo["SeatList"];

		var option ="";

		for (var s = 0; s < SeatsList.length; s++){
			var SeatsData = SeatsList[s];

			if (SeatsData["SeatCode"] == s_code) {

				var TicketList = SeatsData["Ticket"];

				for (var t = 0; t < TicketList.length; t++){
					var TicketData = TicketList[t];

	             	option += "<option value='"+TicketData["Code"]+"'>"+TicketData["Name"]+"</option>";

				}

				zone.find('[name="T_Ticket[]"]').html(option);
            }
		}

	}
	
	function ChangePlace(obj) {
		var z_code = $(obj).parent().parent().parent().parent().parent().find(".exCostLayout").data("code");

		Redraw_Seat(z_code);
		SeatDataBlank(z_code,0);

	}
	
	function ChangeSeat(obj)	{
		var z_code = $(obj).parent().parent().parent().parent().parent().find(".exCostLayout").data("code");

		Redraw_Ticket(z_code);
		SeatDataBlank(z_code,0);
	}

	function SeatDataBlank(z_code,lev) {
		var zone = $('.'+ z_code);
		if (lev==1) {
			zone.find('[name="discount[]"]').html("<option value='0'>할인 종류 선택</option>");
			zone.find('.exCost2_dprice').html("0원");
			zone.find('.exCost3_price').html("0원");
			zone.find('.DiscountInfo').html("");
			zone.find('.PlaceNotice').html("");
		} else {
			zone.find('.SelectList').html("");
			zone.find('.SelectList').data("totalqty",0);
			zone.find('.SelectList').data("totalprice",0);
			zone.find('.exCost1_price').html("0원");
			zone.find('.SelectList2').html("");
			zone.find('.exCost2_price').html("0원");
			zone.find('[name="discount[]"]').html("<option value='0'>할인 종류 선택</option>");
			zone.find('.exCost2_dprice').html("0원");
			zone.find('.exCost3_price').html("0원");
			zone.find('.DiscountInfo').html("");
			zone.find('.PlaceNotice').html("");
		}

	}

	function ChangeDiscount(obj)	{
		var z_code = $(obj).parent().parent().parent().parent().find(".exCostLayout").data("code");

		var zone = $('.'+ z_code);

		var p_code = zone.find('[name="T_Place[]"]').val();
		var s_code = zone.find('[name="T_Seat[]"]').val();

		var d_code = zone.find('[name="discount[]"]').val();
		var d_name = zone.find('[name="discount[]"] option:selected').text();

		var total_qty = zone.find('.SelectList').data("totalqty");
		var total_price = zone.find('.SelectList').data("totalprice");

		d_code = parseInt(d_code);
		total_qty = parseInt(total_qty);
		total_price = parseInt(total_price);

		var discount_amt = 0;
		var discount_total_amt = 0;
		var discount_info = "";

		var t_code, t_name, t_price, t_qty;

		var SelectList = zone.find('.SelectList').children();

		switch(d_code) {
			case 1: /*예매할인*/

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){
					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					if(s_code=="NFR" || s_code=="EFR" || s_code=="ECT") {
						if(t_code==3) {
							discount_amt = t_qty*1000;
						} else {
							discount_amt = t_qty*2000;
						}
					} else {
						discount_amt = t_qty*2000;
					}

					if(discount_info == "") {
						discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
					} else {
						discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
					}

					discount_total_amt += discount_amt;
				}

				break;

			case 2: /*군인/경찰*/
				var limit_qty = 2;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_qty <= limit_qty) {
							discount_amt = t_qty*t_price;
							limit_qty = limit_qty - t_qty;
						} else {
							discount_amt = limit_qty*t_price;
							limit_qty = 0;
						}

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;
					}
				}

				break;

			case 3:/*삼성카드*/
				var limit_qty = 4;
				var dis_price = 2000;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_qty <= limit_qty) {
							discount_amt = t_qty*dis_price;
							limit_qty = limit_qty - t_qty;
						} else {
							discount_amt = limit_qty*dis_price;
							limit_qty = 0;
						}

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;
					}
				}

				break;

			case 4: /*6대 삼성카드*/
				var limit_qty = 2;
				var dis_price = 50;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_qty <= limit_qty) {
							discount_amt = t_qty*(Math.round(t_price * (50 / 100)));
							
							limit_qty = limit_qty - t_qty;
						} else {
							discount_amt = limit_qty*(Math.round(t_price * (50 / 100)));
							limit_qty = 0;
						}

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;
					}
				}

				break;

			case 5: /*삼성카드 S클래스*/
				var limit_qty = 3;
				var dis_price = 50;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_qty <= limit_qty) {
							discount_amt = t_qty*(Math.round(t_price * (50 / 100)));
							
							limit_qty = limit_qty - t_qty;
						} else {
							discount_amt = limit_qty*(Math.round(t_price * (50 / 100)));
							limit_qty = 0;
						}

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;
					}
				}

				break;

			case 6 : /*메가박스 멤버십*/
				var limit_qty = 1;
				var dis_price = 2000;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_qty <= limit_qty) {
							discount_amt = t_qty*dis_price;
							limit_qty = limit_qty - t_qty;
						} else {
							discount_amt = limit_qty*dis_price;
							limit_qty = 0;
						}

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;
					}
				}

				break;

			case 7 : /*이마트*/
				var limit_qty = 1;
				var dis_price = 5000;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_code==1) {

							if(t_qty <= limit_qty) {
								discount_amt = t_qty*dis_price;
								limit_qty = limit_qty - t_qty;
							} else {
								discount_amt = limit_qty*dis_price;
								limit_qty = 0;
							}

							if(discount_info == "") {
								discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
							} else {
								discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
							}
							discount_total_amt += discount_amt;
						}
					}
				}

				break;

			case 8 : /*삼성 임직원*/
				var limit_qty = 2;

				var dis_price1 = 7000;
				var dis_price2 = 3000;
				var dis_price3 = 2000;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_qty <= limit_qty) {

							if(t_code==1) {
								discount_amt = t_qty*dis_price1;
								limit_qty = limit_qty - t_qty;

							} else if(t_code==2) {
								discount_amt = t_qty*dis_price2;
								limit_qty = limit_qty - t_qty;

							} else if(t_code==3) {
								discount_amt = t_qty*dis_price3;
								limit_qty = limit_qty - t_qty;
							}

						} else {
							if(t_code==3) {
								discount_amt = limit_qty*dis_price3;

							} else if(t_code==2) {
								discount_amt = limit_qty*dis_price2;

							} else if(t_code==1) {
								discount_amt = limit_qty*dis_price3;
							}

							limit_qty = 0;
						}

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;
					}
				}

				break;

			case 9: /*문화누리카드(스포츠 바우처)*/
				var limit_qty = 6;

				var dis_price1 = 7000;
				var dis_price2 = 4000;

				var discount_amt = 0;
				var discount_total_amt = 0;
				var discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_qty = SelectData.data("qty");

					if(t_code==3) {
						limit_qty -= t_qty;
					}
				}

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(t_code==1 || t_code==2) {

						if(limit_qty > 0) {
							if(t_qty <= limit_qty) {

								if(t_code==1) {
									discount_amt = t_qty*dis_price1;
									limit_qty = limit_qty - t_qty;

								} else if(t_code==2) {
									discount_amt = t_qty*dis_price2;
									limit_qty = limit_qty - t_qty;
								}

							} else {
								if(t_code==1) {
									discount_amt = limit_qty*dis_price1;

								} else if(t_code==2) {
									discount_amt = limit_qty*dis_price2;
								}

								limit_qty = 0;
							}

							if(discount_info == "") {
								discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
							} else {
								discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
							}
							discount_total_amt += discount_amt;
						}
					} else if(t_code==3) {
						discount_amt = t_qty*t_price;

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;

					}
				}

				break;

			case 10 : /*장애(경증)*/
				var limit_qty = 1;

				var dis_price1 = 7000;
				var dis_price2 = 4000;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(t_code==1 || t_code==2) {

						if(limit_qty > 0) {
							if(t_qty <= limit_qty) {

								if(t_code==1) {
									discount_amt = t_qty*dis_price1;
									limit_qty = limit_qty - t_qty;

								} else if(t_code==2) {
									discount_amt = t_qty*dis_price2;
									limit_qty = limit_qty - t_qty;
								}

							} else {
								if(t_code==1) {
									discount_amt = limit_qty*dis_price1;

								} else if(t_code==2) {
									discount_amt = limit_qty*dis_price2;
								}
								limit_qty = 0;
							}

							if(discount_info == "") {
								discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
							} else {
								discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
							}
							discount_total_amt += discount_amt;
						}
					} else if(t_code==3) {
						discount_amt = t_qty*t_price;

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;

					}
				}

				break;

			case 11:
				var limit_qty = 2; /*장애(중증)*/

				var dis_price1 = 7000;
				var dis_price2 = 3000;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";
				if (total_qty > 1) {
					for (var s = 0; s < SelectList.length; s++){

						var SelectData = SelectList.eq(s);

						t_code = SelectData.data("code");
						t_qty = SelectData.data("qty");

						if(t_code==3) {
							limit_qty -= t_qty;
						}
					}

					for (var s = 0; s < SelectList.length; s++){

						var SelectData = SelectList.eq(s);

						t_code = SelectData.data("code");
						t_name = SelectData.data("name");
						t_price = SelectData.data("price");
						t_qty = SelectData.data("qty");

						discount_amt = 0;

						if(t_code==1 || t_code==2) {

							if(limit_qty > 0) {
								if(t_qty <= limit_qty) {

									if(t_code==1) {
										discount_amt = t_qty*dis_price1;
										limit_qty = limit_qty - t_qty;

									} else if(t_code==2) {
										discount_amt = t_qty*dis_price2;
										limit_qty = limit_qty - t_qty;
									}

								} else {
									if(t_code==1) {
										discount_amt = limit_qty*dis_price1;

									} else if(t_code==2) {
										discount_amt = limit_qty*dis_price2;
									}
									limit_qty = 0;
								}

								if(discount_info == "") {
									discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
								} else {
									discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
								}
								discount_total_amt += discount_amt;
							}
						} else if(t_code==3) {
							discount_amt = t_qty*t_price;

							if(discount_info == "") {
								discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
							} else {
								discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
							}
							discount_total_amt += discount_amt;

						}
					}
				}

				break;

			case 12 : /*국가유공자/경로자*/
				var limit_qty = 1;
				var dis_price = 10000;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_code==1) {

							if(t_qty <= limit_qty) {
								discount_amt = t_qty*dis_price;
								limit_qty = limit_qty - t_qty;
							} else {
								discount_amt = limit_qty*dis_price;
								limit_qty = 0;
							}

							if(discount_info == "") {
								discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
							} else {
								discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
							}
							discount_total_amt += discount_amt;
						}
					}
				}

				break;

			case 13 : /*문화가 있는 날*/
				var limit_qty = 9;
				var dis_price = 50;

				discount_amt = 0;
				discount_total_amt = 0;
				discount_info = "";

				for (var s = 0; s < SelectList.length; s++){

					var SelectData = SelectList.eq(s);

					t_code = SelectData.data("code");
					t_name = SelectData.data("name");
					t_price = SelectData.data("price");
					t_qty = SelectData.data("qty");

					discount_amt = 0;

					if(limit_qty > 0) {
						if(t_qty <= limit_qty) {
							discount_amt = t_qty*(Math.round(t_price * (50 / 100)));
							
							limit_qty = limit_qty - t_qty;
						} else {
							discount_amt = limit_qty*(Math.round(t_price * (50 / 100)));
							limit_qty = 0;
						}

						if(discount_info == "") {
							discount_info += t_name + " " + numberWithCommas(discount_amt)+"원";
						} else {
							discount_info += ", "+ t_name + " " + numberWithCommas(discount_amt)+"원";
						}
						discount_total_amt += discount_amt;
					}
				}

				break;

			default:
		}

		zone.find('.DiscountInfo').html(d_name + " / " + discount_info);
		zone.find('.exCost2_dprice').html(numberWithCommas(discount_total_amt)+"원");
		zone.find('.exCost3_price').html(numberWithCommas(total_price-discount_total_amt)+"원");

		DiscountList = jsonTicketInfo["DiscountType"];

		for (var j = 0; j < DiscountList.length; j++){
			var DiscountData = DiscountList[j];
			
			if (DiscountData["Code"] == d_code ) {
				zone.find('.PlaceNotice').html(DiscountData["Notice"]);
			}
		}

	}

	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
