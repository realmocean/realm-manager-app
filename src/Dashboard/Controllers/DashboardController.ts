
import { Color, cTopLeading, HStack, IconLibrary, State, UIController, UIScene, UIChartOptions, VStack, Text, PositionTypes, cLeading, UIChart, Typography, UIView, UIButton, alpha, DropDown, useApplication, ScrollView, cTop, cVertical, Icon, UIAccordion, ForEach, TextAlignment, Button } from '@tuval/forms';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { Views } from '../../Views/Views';
import { RealmBrokerClient } from '../../Services/RealmBrokerClient';
import { UIKanban } from '@realmocean/kanban'
import { useOrgUIProvider } from '@realmocean/common';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

const items = [
    {
        label: 'Test',
        value: '__'
    },
    {
        label: 'Hello',
        value: 'Mert'
    }
]

const accordionMenu = [
    {
        id: 1,
        title: "Genel",
        subItems: [
            {
                id: 1,
                title: "Genel 1"
            },
            {
                id: 2,
                title: "Genel 2"
            }
        ]
    },
    {
        id: 2,
        title: "Genel 2",
        subItems: [
            {
                id: 2,
                title: "Genel 2"
            }
        ]
    }
]

const colors = {
    'Tanisma': 'rgb(205, 217,253)',
    'InProgress': 'rgb(246, 248,211)',
    'Review': 'rgb(252,229,103)',
    'Close': 'rgb(250,194,10)'
}
const data = [
    {
        "Id": "1",
        "Title": "Musteri 1",
        "Status": "Close",
        "Summary": "Son gorusmede toplanti ayarlandi.",
        "Priority": "High",
        "Tags": "Bug, Release Bug",
        "RankId": 1,
        "Assignee": "Nancy Davloio"
    },
    {
        "Id": "Task 2",
        "Title": "Musteri 2",
        "Status": "InProgress",
        "Summary": "Team ayarla",
        "Priority": "Low",
        "Tags": "Story, Kanban",
        "RankId": 1,
        "Assignee": "Andrew Fuller"
    },
    {
        "Id": "Task 3",
        "Title": "Musteri 3",
        "Status": "Tanisma",
        "Summary": "Ziyaret planla",
        "Priority": "High",
        "Tags": "Bug, Breaking Issue",
        "RankId": 2,
        "Assignee": "Janet Leverling"
    },
    {
        "Id": "Task 4",
        "Title": "Musteri 4",
        "Status": "Tanisma",
        "Summary": "Demo ayarla",
        "Priority": "High",
        "Tags": "Bug, Customer",
        "RankId": 3,
        "Assignee": "Andrew Fuller"
    },
    {
        "Id": "Task 5",
        "Title": "Musteri 5",
        "Status": "Review",
        "Summary": "Arama yap",
        "Priority": "Normal",
        "Tags": "Story, Kanban",
        "RankId": 1,
        "Assignee": "Steven walker"
    },

]

export class DashboardController extends UIController {
    @State()
    private items: any[];

    @State()
    private selectedItem: any;

    @State()
    private showingItems: any[];

    @State()
    private value: any;

    @State()
    private loginsData: any[];

    @State()
    private totalLogins: string;

    @State()
    private standaloneLoginsData: any[];

    @State()
    private totalUsers: string;

    public InitController() {
        this.items = [
            {
                name: 'Mert',
                code: "2"
            },
            {
                name: 'Zans',
                code: "3"
            },
            {
                name: 'Test',
                code: "4"
            }
        ]

        this.showingItems = [
            {
                name: 'Mert',
                code: "2"
            },
            {
                name: 'Zans',
                code: "3"
            },
            {
                name: 'Test',
                code: "4"
            }
        ]
    }

    protected BindRouterParams() {
        console.log(this.Application);
        RealmBrokerClient.GetRealmStatistics().then(result => {
            //console.log(result);
        })



        RealmBrokerClient.GetLoginsLast30Days().then(result => {
            const data = [];
            this.totalLogins = result.total_logins;

            for (let key in result.logins) {
                data.push([
                    Date.parse(key),
                    result.logins[key]
                ]);
            }
            this.loginsData = data;
            console.log(data);
        })
        RealmBrokerClient.GetStandaloneLoginsLast30Days().then(result => {
            const data = [];
            this.totalUsers = result.total_users;
            for (let key in result.users) {
                data.push([
                    Date.parse(key),
                    result.users[key]
                ]);
            }
            this.standaloneLoginsData = data;
        })
    }

    private search(value: string) {
        this.showingItems = [...this.items.filter((item: any) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1)];
    }
    public LoadView() {
        console.log(useApplication());
        const options: UIChartOptions = {
            colors: ['#b40404', '#f0bc6c'],
            legend: {
                show: false
            },
            /* chart: {
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
            }, */
            xaxis: {
                type: 'datetime',
                min: new Date('2022-08-01').getTime(),
                tickAmount: 6,
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true,
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                borderColor: '#EFEFEF',
                row: {
                    colors: ['#F6F6F6']
                },
                column: {
                    colors: ['#F6F6F6']
                }
            }
        };

        const series = [
            {
                name: 'LOGINS',
                data: this.loginsData
            },
            {
                name: 'USERS',
                data: this.standaloneLoginsData
            },
       /*  {
            name: 'series-2',
            data: [23, 12, 54, 61, 32, 56, 81, 19]
        } */]

        return (
            UIScene(

                /*   HStack(
                      AutoComplete().items(this.showingItems)
                          .searchMethod((e) => this.search(e.query))
                          .field('name')
                          .value(this.value)
                          .onChange((e) => this.value = e.value)
                          .itemTemplate((item) => Text(item.name)),
                      DropDown().model(this.items).itemTemplate(() => Text('AAA')).border('solid 1px gray')
                  ).height(), */
                HStack({ alignment: cTopLeading })(
                    LeftSideMenuView('', 'Dashboard'),
                    Views.RightSidePage({
                        title: 'Dashboard',
                        content: (
                            VStack({ alignment: cTopLeading, spacing: 20 })(
                                /* ScrollView({ axes: cVertical, alignment: cTopLeading })(
                                    VStack({ alignment: cTopLeading })(
                                        UIKanban()
                                            .columns([
                                                { headerText: 'Tanisma', keyField: 'Tanisma' },
                                                { headerText: 'Ihtiyac Belirleme', keyField: 'InProgress' },
                                                { headerText: 'Teklif Hazirlama', keyField: 'Review' },
                                                { headerText: 'Pazarlik', keyField: 'Close' }
                                            ])
                                            .dataSource(data)
                                            .headerTemplate(item =>
                                                VStack({ alignment: cLeading, spacing: 5 })(
                                                    HStack({ alignment: cLeading, spacing: 10 })(
                                                        Icon(IconLibrary.AddTask).size(20),
                                                        Text(item.headerText).fontSize(18)
                                                    )
                                                        .cornerRadius(5)
                                                        .padding(10)
                                                        .background('rgb(43,43,43)')
                                                        .foregroundColor('rgb(198,198,198)')
                                                        .clipPath('polygon(0% 0%, calc(100% - 10px) 0, 100% 48%, calc(100% - 10px) 100%, 0% 100%)')
                                                    ,
                                                    HStack(
                                                        Text('')
                                                    )
                                                        .width('calc(100% - 10px)')
                                                        .height(20).background(colors[item.keyField] ?? 'blue')

                                                )
                                            )
                                            .cardTemplate(item =>
                                                VStack({ alignment: cLeading })(
                                                    Text(item.Title).fontSize(16).fontWeight('500'),
                                                    Text(item.Summary).fontSize(10)
                                                ).height().padding(5).background(Color.white)
                                            )

                                    )
                                ), */

                                VStack(

                                    HStack(
                                        HStack(
                                            UIChart().series(series).options(options as any)
                                                .height(300).chartType('area')
                                        )
                                            .background(Color.white)
                                            .padding(20)
                                            .cornerRadius(10)
                                            .height()
                                    )
                                        .padding(20),



                                    HStack({ alignment: cTopLeading, spacing: 20 })(
                                        VStack({ alignment: cLeading })(
                                            Text('Logins').fontSize(14).textTransform('uppercase').lineHeight('20px').fontWeight('600').foregroundColor('#333')
                                                .fontFamily('Ubuntu,sans-serif').fontWeight('700').foregroundColor('#333'),
                                            Text(this.totalLogins).fontSize(30).lineHeight('38px').fontWeight('700').foregroundColor('#b40404').fontFamily('Ubuntu,sans-serif')
                                        ).width(),
                                        VStack({ alignment: cLeading })(
                                            Text('Users').fontSize(14).textTransform('uppercase').lineHeight('20px').fontWeight('600').foregroundColor('#333')
                                                .fontFamily('Ubuntu,sans-serif').fontWeight('700').foregroundColor('#333'),
                                            Text(this.totalUsers).fontSize(30).lineHeight('38px').fontWeight('700').foregroundColor('#f0bc6c').fontFamily('Ubuntu,sans-serif')
                                        ).width()
                                    )
                                        .padding('10px 20px').left('95px').width().height().position(PositionTypes.Absolute).top('85px')
                                        .background('rgba(255,255,255,.8)')
                                        .shadow('0 4px 9px 0 rgb(0 0 0 / 15%)')
                                        .cornerRadius(8)
                                ).padding(5).height(),

                                HStack({ alignment: cTopLeading, spacing: 10 })(
                                    Views.DashboardTile('Tenants', '126', IconLibrary.AccountCircle,
                                        Color.blue500, Color.blue100),
                                    Views.DashboardTile('Errors', '12', '\\d21e',
                                        Color.red700, Color.red100),
                                    Views.DashboardTile('Active Tickets', '55', '\\d1f3',
                                        Color.green500, Color.green100),

                                ).height()
                            )
                        )
                    })

                )
            )
        )
    }
}