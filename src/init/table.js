const initTables = () => {
    $('#query-result').bootstrapTable({
        classes: "table table-striped table-bordered table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        customSort: sortingData,
        columns: [{
            field: 'history',
            title: '#',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }, {
            field: 'ban',
            title: 'Ban',
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'own_team',
            title: '己方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'enemy_team',
            title: '对方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'win_matches',
            title: '获胜场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'total_matches',
            title: '总场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'win_rate',
            title: '胜率',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }, {
            field: 'details',
            title: '更多',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }]
    })
    $('#detailed-query-result').bootstrapTable({
        classes: "table table-striped table-bordered table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        customSort: sortingData,
        pagination: true,
        pageNumber: 1,
        pageSize: 10,
        pageList: "[10, 20, 50, 200]",
        paginationHAlign: "left",
        paginationDetailHAlign: "right",

        columns: [{
            field: 'own_team',
            title: '己方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'enemy_team',
            title: '对方阵容',
            align: 'center',
            valign: 'middle',
            width: 25,
            widthUnit: '%'
        }, {
            field: 'win_matches',
            title: '获胜场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 15,
            widthUnit: '%'
        }, {
            field: 'total_matches',
            title: '总场次',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 15,
            widthUnit: '%'
        }, {
            field: 'win_rate',
            title: '胜率',
            sortable: true,
            align: 'center',
            valign: 'middle',
            width: 20,
            widthUnit: '%'
        }]
    })

    $('#shishen-rank-table').bootstrapTable({
        classes: "table table-striped table-hover",
        theadClasses: "thead-light",
        sortable: true,
        sortOrder: 'desc',
        pagination: true,
        pageNumber: 1,
        pageSize: 20,
        pageList: "[20, 50, 100, 200]",
        paginationHAlign: "left",
        paginationDetailHAlign: "right",
        columns: [{
            field: 'rank',
            title: '#',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }, {
            field: 'rank_change',
            title: '',
            align: 'center',
            valign: 'middle',
            width: 5,
            widthUnit: '%'
        }, {
            field: 'shishen',
            title: '式神',
            align: 'center',
            valign: 'middle',
            width: 20,
            widthUnit: '%'
        }, {
            field: 'win_rate',
            title: '外战胜率',
            align: 'center',
            valign: 'middle',
            width: 30,
            widthUnit: '%'
        }, {
            field: 'pick_rate',
            title: '选用率',
            align: 'center',
            valign: 'middle',
            width: 30,
            widthUnit: '%'
        }, {
            field: 'total_matches',
            title: '外战次数',
            align: 'center',
            valign: 'middle',
            width: 10,
            widthUnit: '%'
        }]
    })
};
;

export default initTables;
