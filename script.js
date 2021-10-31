// Start Variable

const baseurl = '//localhost:5500/';
const apiurl = '//node.fivefrogsix.com/';

// End Variable

//Start jQuqery

$(function(){ 
   

    $( "#province" ).autocomplete({
        source: function( request, response ) {
            $.ajax( {
                url: apiurl+"address/provinces",
                type: 'GET',
                dataType: "json",
                data: {
                    search: request.term,
                },
                success: function( data ) {
                    response( data.provinces );
                }
            } );
            },
            classes: {
                "ui-autocomplete": "auto-height"
            },
            minLength: 0,
            select: function( event, ui ) {
                console.log(ui.item)
                $(this).prev().val(ui.item.id);
                $(this).attr('placeholder',ui.item.label)

                $('#amphur, #districts').val('').attr('placeholder', '');

                $(this).blur();
            }
        
    }).blur(function(){
        const text = $(this).attr('placeholder')
        $(this).val(text)
    });


    $('#province').focus(function(){
        const elem = $(this);
        focusAutocom(elem);
    })

    $( "#amphur" ).autocomplete({
        source: function( request, response ) {
            const province_filter = $('#province').prev().val();
            console.log(province_filter)
            $.ajax( {
                url: apiurl+"address/amphurs",
                type: 'GET',
                dataType: "json",
                data: {
                    search: request.term,
                    prov: province_filter
                },
                success: function( data ) {
                response( data.amphurs );
                }
            } );
            },
            classes: {
                "ui-autocomplete": "auto-height"
            },
            minLength: 0,
            select: function( event, ui ) {
                $(this).prev().val(ui.item.id);
                $(this).attr('placeholder',ui.item.label)
                $(this).blur();
            }
        
    }).blur(function(){
        const text = $(this).attr('placeholder')
        $(this).val(text)
    });


    $('#amphur').focus(function(){
        const elem = $(this);
        focusAutocom(elem);
    })

    $( "#districts" ).autocomplete({
        source: function( request, response ) {
            const amhpures_filter = $('#amphur').prev().val();
          $.ajax( {
            url: apiurl+"address/districts",
            type: 'GET',
            dataType: "json",
            data: {
              search: request.term,
              amhpures: amhpures_filter
            },
            success: function( data ) {
              response( data.districts );
            }
          } );
        },
        classes: {
            "ui-autocomplete": "auto-height"
        },
        minLength: 0,
        select: function( event, ui ) {
            $(this).prev().val(ui.item.id);
            $('#zipcode').val(ui.item.zip_code);
            $(this).attr('placeholder',ui.item.label)
            $(this).blur();
        }
        
    }).blur(function(){
        const text = $(this).attr('placeholder')
        $(this).val(text)
    });

    


    
    
    
    $('#districts').focus(function(){
        const elem = $(this);
        focusAutocom(elem);
    })
    

    $( "#year" ).autocomplete({
        source: year(),
        classes: {
            "ui-autocomplete": "auto-height"
        },
        minLength: 0,
        select: function( event, ui ) {

            $(this).attr('placeholder',ui.item.label)
            $('#month').val('').attr('placeholder','').removeAttr('disabled');
            $('#days').val('').attr('placeholder','').removeAttr('disabled');
            $(this).blur();

            $( "#month" ).autocomplete({
                source: month(ui.item.leap),
                classes: {
                    "ui-autocomplete": "auto-height"
                },
                minLength: 0,
                select: function( event, ui ) {
                    $(this).attr('placeholder',ui.item.label)
                    $('#days').removeAttr('disabled');
                    $('#days').val('').attr('placeholder','').removeAttr('disabled');
                    $(this).blur();

                    $( "#days" ).autocomplete({
                        source: days(ui.item.day),
                        classes: {
                            "ui-autocomplete": "auto-height"
                        },
                        minLength: 0,
                        select: function( event, ui ) {
                            $(this).attr('placeholder',ui.item.label)
                            $(this).blur();
                        }
                        
                    }).blur(function(){
                        const text = $(this).attr('placeholder')
                        $(this).val(text)
                    });
                
                    $('#days').focus(function(){
                        const elem = $(this);
                        focusAutocom(elem);
                    })
                }
                
            }).blur(function(){
                const text = $(this).attr('placeholder')
                $(this).val(text)
            });

            $('#month').focus(function(){
                const elem = $(this);
                focusAutocom(elem);
            })
            
        }
        
    }).blur(function(){
        const text = $(this).attr('placeholder')
        $(this).val(text)
    });
    
    
    $('#year').focus(function(){
        const elem = $(this);
        focusAutocom(elem);
    })

    

    
    
    
    
   
}) 
//End jQuqery

// Run


//Start Function

function focusAutocom(elem){
    elem.val('');
    elem.autocomplete('search', elem.val());

}

function year(){
    const date = new Date();
    const yearArray = new Array();

    const year = date.getFullYear();
    const onehundred = date.getFullYear()-130;

    for(let i=year; i>onehundred; i--){
        yearArray.push({
            year: i,
            label: i+543,
            leap: leapYear(i)
        });
    }

    return yearArray;
}

function month(leap){
    const monthSetArray = new Array();

    const monthArray =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthArrayTH =  ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฏาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    

    for(let i=1; i<=monthArray.length; i++){
        let TotalDay = 0;

        if([1, 3, 5, 7, 8, 10, 12].includes(i)){
            TotalDay = 31;
        }else if([4, 6, 9, 11].includes(i)){
            TotalDay = 30;
        }else{
            TotalDay = 28;
            if(leap){
                TotalDay = 29;
            }
        }

        monthSetArray.push({
            id: i,
            name: monthArray[i-1],
            label: monthArrayTH[i-1],
            day: TotalDay,
        })
    }   

    return monthSetArray;
}

function days(total){
    const totalDays = new Array();

    for(let i=1; i<=total; i++){
        totalDays.push({label:i});
    };

    return totalDays;
}

function leapYear(year){
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}



//End Function

