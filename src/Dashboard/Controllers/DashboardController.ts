import { AreaSerie, ChartView } from '@tuval/components-charts';
import { Color, cTopLeading, HStack, IconLibrary, State, UIController, UIScene, UIChartOptions, VStack, Text, PositionTypes, cLeading, UIChart, Typography, UIView, UIButton, alpha, DropDown } from '@tuval/forms';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { Views } from '../../Views/Views';
import { RealmBrokerClient } from '../../Services/RealmBrokerClient';
import { FuButton, MyButton } from '@tuval/fusion';

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
                              /*   HStack(
                                    DropDown(option =>
                                        Text(option.label)
                                    )(option =>
                                        HStack({ alignment: cLeading, spacing: 5 })(
                                            Text(option.label),
                                            Text(option.label)
                                        )
                                    )
                                        .model(items).value(this.selectedItem).onSelected((value) => this.selectedItem = value)
                                ).border('solid 1px gray').height(50)
                                , */
                                VStack(
                                    UIChart().series(series).options(options as any)
                                        .height(300),

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
                                        .padding('10px 20px').left('55px').width().height().position(PositionTypes.Absolute).top('45px')
                                        .background('rgba(255,255,255,.8)')
                                        .shadow('0 4px 9px 0 rgb(0 0 0 / 15%)')
                                        .cornerRadius(8)
                                ).padding(5).height(),

                                HStack({ alignment: cTopLeading, spacing: 10 })(
                                    /*  DashboardItem(IconLibrary.Visibility, 'Logins', '1300', 'AVG'),
                                     DashboardItem(IconLibrary.Visibility, 'App Downloads', '1300', 'AVG') */
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