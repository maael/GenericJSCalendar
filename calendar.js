calendar = {
    element: null,
    today: null,
    date: null,
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    monthNames: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
    dayNames: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    make:function(input_element){
        this.element=document.getElementById('calendar');
        this.today = new Date();
        this.date = this.today; 
        this.setDate(4,8,this.today.getFullYear()).loadMonthsView();
    },
    setDate:function(day,month,year){
        this.date = new Date(year,month,day);
        return this;
    },
    getDaysInMonth:function(month,year){
        return new Date(year,month+1,0).getDate();
    },
    getFormattedDate:function(day,month,year){
        return day.toString() + '/' + this.months[month] + '/' + year.toString();
    },
    loadMonthsView:function(){
        var table = "<table><thead id='revert'>";
        table += "<tr><th colspan='3'>"+this.date.getFullYear()+"</th></tr>";
        table += "</thead><tbody><tr>";
        for(var i=0;i<this.monthNames.length;i++){
            var cell = "<td class='month' data-month='"+i+"'>"+this.monthNames[i]+"</td>";
            (i%3==0 && i!=this.monthNames.length && i!=0) ? table += "</tr><tr>"+cell : table += cell;
        }
        table += "</tr></tbody></table>";
        this.element.innerHTML = table;
        document.getElementById('revert').onclick = function(){calendar.loadMonthsView();}; 
        var monthsElements = document.getElementsByClassName('month');
        for(var i=0;i<monthsElements.length;i++){
            monthsElements[i].onclick = function(){calendar.setDate(1,this.getAttribute("data-month"),calendar.date.getFullYear()).loadMonthView();};
        }
    },
    loadMonthView:function(){
        var table = "<table><thead id='revert'>";
        table += "<tr><th colspan='7'>"+this.monthNames[this.date.getMonth()]+" "+this.date.getFullYear()+"</th></tr>";
        table += "</thead><tbody><tr>";
        for(var i=0;i<this.dayNames.length;i++){
            table += "<th>"+this.dayNames[i]+"</th>";
        }
        table += "</tr><tr>";
        var daysInMonth = this.getDaysInMonth(this.date.getMonth(),this.date.getFullYear());
        var startDay = ((new Date(this.date.getFullYear(),this.date.getMonth(),1).getDay()-1)%7);
        if(startDay<0){startDay=6;}
        for(var i=1;i<=daysInMonth+startDay;i++){
            if(i<=startDay){
                table += "<td></td>";
            } else {
                var cell = "<td class='day'>"+(i-startDay)+"</td>";
                (i%7==1) ? table += "</tr><tr>"+cell : table += cell; 
            }  
        }
        for(var i=0;i<(35-(daysInMonth+startDay));i++){
            table += "<td></td>";
        }
        table += "</tr></tbody></table>";
        this.element.innerHTML = table;
        document.getElementById('revert').onclick = function(){calendar.loadMonthsView();};
        var monthsElements = document.getElementsByClassName('day');
        for(var i=0;i<monthsElements.length;i++){
            monthsElements[i].onclick = function(){calendar.setDate(this.innerHTML,calendar.date.getMonth(),calendar.date.getFullYear()).loadDayView();};
        } 
    }
}