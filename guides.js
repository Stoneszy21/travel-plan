/* =========================================================================
 * 分类汇总数据 —— 洲际交通 / 当地交通 / 景点
 *
 * 这个文件只负责「按类别归纳」的信息，不参与时间轴渲染。
 * 想改某一类内容，直接改对应数组里的对象即可。
 *
 * 字段说明：
 *   flights[]  洲际交通：label 标题，legs[] 航段，points[] 要点清单
 *   ground[]   当地交通：title / day / options[]（mode 方式、time 耗时、cost 费用、detail 细节）/ tip
 *   sights[]   景点：name / day / hours 营业时间 / booking 预约 / plan[] 园内动线 / note
 *
 * 标注「待核对」「以官网为准」的，是没拿到一手确认的，出发前用官方 App/网站再看一眼。
 * ========================================================================= */

window.TRIP_GUIDES = {
  /* ------------------------------ 洲际交通 ------------------------------ */
  flights: [
    {
      label: '去程 · 11/13 上海 → 劳德代尔堡',
      legs: [
        { no: 'DL280', from: '上海浦东 T1', to: '底特律 McNamara', dep: '10:00', arr: '11:31', dur: '13 小时 31 分' },
        { no: 'DL · 待核对', from: '底特律 McNamara', to: '劳德代尔堡 T2', dep: '15:35', arr: '18:35', dur: '2 小时 50 分' }
      ],
      points: [
        '浦东 T1 达美柜台，07:00 前到（国际航班提前 3 小时）',
        '值机时确认两件事：行李直挂到 FLL、回程座位',
        '底特律入境流程：下机 → 入境查验 → 取行李 → 海关 → 重新托运 → 重新安检。中转 4 小时够，不用跑',
        '安检一共 2 次：浦东 1 次 + 底特律入境后 1 次',
        '购物建议：底特律的免税店不算便宜，真要买留到回程 FLL，或者到奥兰多的免税店；机上 13.5 小时两顿正餐，别指望零食',
        '随身带上飞机：颈枕、拖鞋、润唇膏、一支笔（填入境卡用得着）'
      ]
    },
    {
      label: '回程 · 11/22 劳德代尔堡 → 上海',
      legs: [
        { no: 'DL · 待核对', from: '劳德代尔堡 T2', to: '底特律 McNamara', dep: '早上（约 09:20）', arr: '待核对', dur: '约 3 小时' },
        { no: 'DL · 待核对', from: '底特律 McNamara', to: '上海浦东 T1', dep: '待核对', arr: '次日', dur: '约 13 小时' }
      ],
      points: [
        '07:20 到 FLL 值机（国际航班提前 3 小时），还车留 25 分钟',
        '行李直挂上海，底特律只换登机口、不再取行李',
        '回程安检 2 次：FLL 1 次 + 底特律登机前 1 次',
        'FLL 免税店比底特律大，伴手礼在 FLL 买',
        '底特律中转如果只有 1.5 小时，下机后先看屏幕确认登机口，别逛店',
        '到上海是次日，落地后地铁 2 号线末班车约 23:00，注意时间'
      ]
    }
  ],

  /* ------------------------------ 当地交通 ------------------------------ */
  ground: [
    {
      title: 'FLL 机场 → 奥兰多',
      from: { lat: 26.0742, lng: -80.1506, label: 'FLL 机场' },
      to: { lat: 28.5383, lng: -81.3792, label: '奥兰多市区' },
      day: '11/13',
      options: [
        { mode: '自驾', time: '约 3 小时', cost: '油费 $25 上下（车另算）', detail: 'I-95 北上 → FL-91 Turnpike，全程高速。19:30 出发约 22:30–23:00 到。夜里车少，服务区也少，出发前加满油。',
          fac: [
            { k: '取车', v: 'FLL 到达层出站后跟「Rental Car Center」指示，坐免费接驳车 5 分钟到；还车也是这里' },
            { k: '停车', v: '奥兰多酒店自带车位，约 $15–25/晚（订房时确认）' }
          ] },
        { mode: 'Brightline 火车', time: '约 3 小时', cost: '$40–90/人（提前买更便宜）', detail: '劳德代尔堡站在市中心（NW 2nd Ave），奥兰多站在 MCO 机场 C 航站楼，到市区还要再打车 25 分钟。⚠️ 今晚 18:35 落地赶不上末班车，这条只适合白天走。',
          spots: [
            { label: '起点 · Brightline 劳德代尔堡站', lat: 26.1224, lng: -80.1440, zoom: 15.6, note: '从 FLL 机场打车 12 分钟约 $18；从 17th St 的酒店 8 分钟约 $10。车站入口在 NW 2nd Ave，候车厅在 2 楼，建议提前 15 分钟到。行李可以带上车，车上有行李架。' },
            { label: '终点 · 奥兰多站（MCO C 航站楼）', lat: 28.4219, lng: -81.3077, zoom: 15.6, note: '出站直接进 MCO 机场 C 航站楼。最后一公里：到市区酒店打车 25 分钟约 $35–45，或坐 Lynx 111 路约 45 分钟 $2（班次 30 分钟一班）。这段最容易低估时间。' }
          ] },
        { mode: '打车 / Uber', time: '约 3 小时', cost: '$250–320', detail: '价格高且不可控，两个人不如租车。回程如果自驾不方便，可以只买单程。',
          fac: [
            { k: '上车', v: 'FLL 到达层门外 Rideshare 区（1 号门出去，有蓝色标识），别在出租车道等' },
            { k: '下车', v: '奥兰多酒店门口，让司机停大堂前' }
          ] }
      ],
      tip: '结论：在 FLL 直接租车，奥兰多几天、KSC、回劳德代尔堡全用得上，比打车划算得多。'
    },
    {
      title: '奥兰多市内：酒店 ↔ Winter Park / 市区',
      from: { lat: 28.5383, lng: -81.3792, label: '奥兰多市区' },
      to: { lat: 28.5916, lng: -81.3485, label: 'Winter Park' },
      day: '11/14',
      options: [
        { mode: '打车 / Uber', time: '15–20 分钟', cost: '$15–22 单程', detail: '上下车点：Winter Park 在 Park Ave 与 Morse Blvd 路口最好停；市区在 Lake Eola 东侧 Rosalind Ave 路边。',
          fac: [
            { k: '下车', v: 'Winter Park：Park Ave × Morse Blvd 路口东北角；市区：Rosalind Ave 靠 Lake Eola 一侧' },
            { k: '上车', v: '回程在同一路口叫车，Winter Park 晚上车不多，提前 5 分钟叫' }
          ] },
        { mode: '自驾', time: '15–20 分钟', cost: '停车 $5–10', detail: 'Park Ave 有路边咪表位，周末中午比较满；市区图书馆有公共车库。',
          fac: [
            { k: '停车', v: 'Park Ave 路边咪表 $1.5/小时（最多 2 小时）；市中心图书馆旁 Parken 车库 $5 起' }
          ] },
        { mode: '公交 LYNX', time: '40–60 分钟', cost: '$2', detail: '班次 30 分钟一班，等车时间比车程长，这趟不建议。',
          spots: [
            { label: '换乘点 · Lynx Central Station', lat: 28.5413, lng: -81.3868, zoom: 15.6, note: '市区几乎所有线路都从这个枢纽发车。去 Winter Park 坐 102 路；最后一公里从 Park Ave 下车后步行约 5 分钟到 Rollins College 正门。' }
          ] },
      ],
      tip: '这一天点都在十几公里内，打车最省事；自驾也行但找车位会花时间。'
    },
    {
      title: '奥兰多 → Blue Spring State Park',
      from: { lat: 28.5383, lng: -81.3792, label: '奥兰多' },
      to: { lat: 28.9487, lng: -81.3396, label: 'Blue Spring' },
      day: '11/15',
      options: [
        { mode: '自驾', time: '45–50 分钟', cost: '油费 $8 + 门票 $6/车', detail: 'I-4 东 → FL-472 → US-17，直接导航到 2100 W French Ave, Orange City。园内停车免费。',
          fac: [
            { k: '入口', v: '2100 W French Ave，进门后左转是 1 号停车场' },
            { k: '停车', v: '园内免费；1 号场离皮划艇码头最近，8:30 前到基本有位' }
          ] },
        { mode: '打车 / Uber', time: '45–50 分钟', cost: '$45–60 单程', detail: '⚠️ 回程在这边很难叫到车，一定提前跟司机约好返程时间，或者留一个当地出租电话。',
          fac: [
            { k: '下车', v: '园区入口游客中心前（不是里面码头）' },
            { k: '回程', v: '提前 15 分钟约车；园内信号弱，最好在停车场再叫' }
          ] }
      ],
      tip: '这一天强烈建议自驾：早上 7:30 出发，园里 8:00 开门，第一批下水人最少。'
    },
    {
      title: '奥兰多 → Lakeland（赖特校园，D2 方案 B）',
      from: { lat: 28.5383, lng: -81.3792, label: '奥兰多' },
      to: { lat: 28.0306, lng: -81.9479, label: 'Lakeland' },
      day: '11/14',
      options: [
        { mode: '自驾', time: '约 1 小时', cost: '油费 $10', detail: 'I-4 向西，导航到 111 Lake Hollingsworth Dr, Lakeland。校园内有访客停车。',
          fac: [
            { k: '入口', v: '从 Frank Lloyd Wright Way 进校园，访客停车场就在游客中心旁' },
            { k: '停车', v: '校园访客停车免费' }
          ] },
        { mode: '打车 / Uber', time: '约 1 小时', cost: '$65–80 单程', detail: '往返 $130–160；回程 16:30 在校园不好叫车，提前约好。',
          fac: [
            { k: '下车', v: '游客中心正门（111 Lake Hollingsworth Dr）' },
            { k: '回程', v: '16:30 在游客中心门口等，提前 20 分钟叫车' }
          ] }
      ],
      tip: '导览只有 10:00 和 14:00 两场（90 分钟），要去就得 12:30 从奥兰多出发赶 14:00 那场。'
    },
    {
      title: '奥兰多 → 肯尼迪航天中心',
      from: { lat: 28.5383, lng: -81.3792, label: '奥兰多' },
      to: { lat: 28.5231, lng: -80.6818, label: 'KSC 游客中心' },
      day: '11/17',
      options: [
        { mode: '自驾（推荐）', time: '约 1 小时', cost: '油费约 $12 + 停车 $10', detail: 'FL-417 → FL-528 向东直达，全程高速，早高峰往东不堵。',
          fac: [
            { k: '入口', v: '下 FL-528 后跟「Kennedy Space Center Visitor Complex」标志走' },
            { k: '停车', v: '游客中心停车场 $10/天，A 区离检票口最近' }
          ] },
        { mode: '打车 / Uber', time: '约 1 小时', cost: '$95–120 单程', detail: '去程好叫，回程在 KSC 门口很难叫到车——一定要提前约好返程，或者干脆自驾。',
          fac: [
            { k: '下车', v: '游客中心主入口（不是团体大巴下客区）' },
            { k: '回程', v: '提前一天在 App 里预约 15:30 的返程，现场叫车经常没人接' }
          ] }
      ],
      tip: '早上 7:45 出发，8:45 到，正好赶上 9:00 开门。'
    },
    {
      title: '肯尼迪航天中心 → 劳德代尔堡',
      from: { lat: 28.5231, lng: -80.6818, label: 'KSC 游客中心' },
      to: { lat: 26.1018, lng: -80.1252, label: 'Holiday Inn Express' },
      day: '11/17',
      options: [
        { mode: '自驾', time: '约 3 小时 15 分', cost: '油费约 $28', detail: 'FL-528 转 I-95 南下，中途在 Fort Pierce 服务区休息；17:00 后进入 Broward 段会堵，多留 30 分钟。',
          fac: [
            { k: '停车', v: '直接开进酒店停车场，约 $15/天（入住时确认）' },
            { k: '加油', v: '下高速前在服务的加油站加满——还车要求满油' }
          ],
          spots: [
            { label: '中途休息 · Fort Pierce 服务区', lat: 27.4250, lng: -80.3770, zoom: 14.5, note: 'I-95 南向约 130 公里处，有加油站、快餐和厕所。开到这里差不多 1 小时 40 分，正好换人开。' }
          ] },
      ],
      tip: '15:30 出园，算上晚高峰，18:45 前后到酒店。'
    },
    {
      title: '劳德代尔堡本地：酒店 ↔ 会场 ↔ 海滩',
      from: { lat: 26.1018, lng: -80.1252, label: '酒店' },
      to: { lat: 26.0996, lng: -80.119, label: '会展中心' },
      day: '11/17–11/22',
      options: [
        { mode: '步行', time: '12 分钟', cost: '免费', detail: '酒店（1500 SE 17th St）到会展中心（1950 Eisenhower Blvd）过一座桥就到，全程有人行道。',
          fac: [
            { k: '路线', v: 'SE 17th St 往东，过 Intracoastal 桥，桥上有独立人行道' },
            { k: '提示', v: '穿正装或下雨就打车，5 分钟 $8–12' }
          ] },
        { mode: '打车', time: '5 分钟', cost: '$8–12', detail: '下雨或穿正装时打车。海滩方向在 A1A 与 Las Olas 路口下车最方便。',
          fac: [
            { k: '下车', v: '会展中心正门 Eisenhower Blvd 有 Rideshare 区；海滩在 A1A × Las Olas 路口' },
            { k: '上车', v: '会展中心正门或酒店大堂，两个都在 5 分钟内' }
          ] },
        { mode: '自驾', time: '5–8 分钟', cost: '会场停车 $15–20/天', detail: '会展中心有停车楼；酒店自己也有车位，建议车停酒店、走过去。',
          fac: [
            { k: '停车', v: '会展中心停车楼 $15–20/天；酒店车位约 $15/天，建议停酒店' }
          ] }
      ],
      tip: 'WAF 三天完全可以不开车。要去远一点（Bonnet House、NSU）再打车，单程都在 $10 以内。'
    },
    {
      title: '自由日：劳德代尔堡 ↔ 迈阿密',
      from: { lat: 26.1018, lng: -80.1252, label: '劳德代尔堡' },
      to: { lat: 25.7444, lng: -80.2103, label: 'Vizcaya / 迈阿密' },
      day: '11/21',
      options: [
        { mode: '自驾', time: '40–50 分钟', cost: '油费 $8 + 迈阿密停车 $20–30', detail: 'I-95 南下。Vizcaya 有停车场；Wynwood 停车贵，建议停在 NW 2nd Ave 的车库。',
          fac: [
            { k: 'Vizcaya', v: '正门停车场免费，车位不少，9:50 到好停' },
            { k: 'Wynwood', v: 'NW 2nd Ave 的公共车库，$10–20/半天' },
            { k: 'South Beach', v: '12th St 市政停车楼，约 $2/小时' }
          ] },
        { mode: '打车 / Uber', time: '40–50 分钟', cost: '$50–60 单程', detail: '一天跑三个点，打车总价可能 $150+，两个人分摊还行。',
          fac: [
            { k: 'Vizcaya', v: '正门下车（South Miami Ave 入口）' },
            { k: 'Wynwood', v: 'NW 2nd Ave × 25th St 路口下车' },
            { k: 'South Beach', v: 'Ocean Dr × 12th St 下车' }
          ] },
        { mode: 'Brightline 火车', time: '30–40 分钟', cost: '$15–25/人', detail: '劳德代尔堡站 → 迈阿密中央站，再打车去各点。班次约 1 小时一班，适合只去市中心一个点。',
          fac: [
            { k: '下车', v: 'MiamiCentral 站（NW 6th St），出站打车去各点' },
            { k: '回程', v: '末班车约 21:00，玩到傍晚就够回' }
          ] }
      ],
      tip: '三个点（Vizcaya → Wynwood → South Beach）跨得远，自驾最灵活；只去一个点就坐 Brightline。'
    }
  ],

  /* ------------------------------- 美食 -------------------------------- */
  dishes: {
    asian: { t: 'img/food/asian-t.jpg', m: 'img/food/asian-m.jpg', f: 'img/food/asian.jpg' },
    barbecue: { t: 'img/food/barbecue-t.jpg', m: 'img/food/barbecue-m.jpg', f: 'img/food/barbecue.jpg' },
    breakfast: { t: 'img/food/breakfast-t.jpg', m: 'img/food/breakfast-m.jpg', f: 'img/food/breakfast.jpg' },
    brunch: { t: 'img/food/brunch-t.jpg', m: 'img/food/brunch-m.jpg', f: 'img/food/brunch.jpg' },
    burger: { t: 'img/food/burger-t.jpg', m: 'img/food/burger-m.jpg', f: 'img/food/burger.jpg' },
    crab: { t: 'img/food/crab-t.jpg', m: 'img/food/crab-m.jpg', f: 'img/food/crab.jpg' },
    cuban: { t: 'img/food/cuban-t.jpg', m: 'img/food/cuban-m.jpg', f: 'img/food/cuban.jpg' },
    diner: { t: 'img/food/diner-t.jpg', m: 'img/food/diner-m.jpg', f: 'img/food/diner.jpg' },
    icecream: { t: 'img/food/icecream-t.jpg', m: 'img/food/icecream-m.jpg', f: 'img/food/icecream.jpg' },
    italian: { t: 'img/food/italian-t.jpg', m: 'img/food/italian-m.jpg', f: 'img/food/italian.jpg' },
    oyster: { t: 'img/food/oyster-t.jpg', m: 'img/food/oyster-m.jpg', f: 'img/food/oyster.jpg' },
    sandwich: { t: 'img/food/sandwich-t.jpg', m: 'img/food/sandwich-m.jpg', f: 'img/food/sandwich.jpg' },
    seafood: { t: 'img/food/seafood-t.jpg', m: 'img/food/seafood-m.jpg', f: 'img/food/seafood.jpg' },
    steak: { t: 'img/food/steak-t.jpg', m: 'img/food/steak-m.jpg', f: 'img/food/steak.jpg' },
    taco: { t: 'img/food/taco-t.jpg', m: 'img/food/taco-m.jpg', f: 'img/food/taco.jpg' }
  },

  foodTips: [
    {
      title: '奥兰多 · 值得专程去的几家',
      note: '下面这些不是"顺路吃"，是值得为它调整行程的。都在市区或 Winter Park 附近，打车 15 分钟内。',
      places: [
        { name: 'Prato', cat: '意式', addr: '124 N Park Ave, Winter Park', note: 'Park Ave 上最稳的一家，手工意面和柴火披萨。室内偏暗、木桌，适合坐下来慢慢吃；D2 中午就安排在这儿。周末要等位，12 点前到。' },
        { name: 'Christner\'s Prime Steak House', cat: '老派牛排', addr: '5410 E Colonial Dr', note: '1975 年开到现在，深色木头、西装服务生那种老派牛排馆，本地人谈事情都来这儿。' },
        { name: '4 Rivers Smokehouse', cat: 'BBQ', addr: '1600 W Fairbanks Ave, Winter Park', note: '佛州本地最好的烤肉连锁，牛肋排和 brisket 都稳。中午 11:30 前去不用排。' },
        { name: "Gideon's Bakehouse", cat: '曲奇', addr: 'East End Market / Disney Springs', note: '半磅一块的厚曲奇，网红但真的好吃。下午常有 40 分钟队，买两块带走当夜宵。' },
        { name: 'Se7en Bites', cat: '南方 Brunch', addr: '539 Virginia Dr（Milk District）', note: '南方家常菜和烘焙，只开到下午 3 点——想吃必须排在上午。' }
      ]
    },
    {
      title: '机场怎么吃（美国航站楼通用）',
      note: '美国机场餐饮两极分化：连锁稳、独立店贵且慢。赶时间就认牌子，别赌。',
      places: [
        { name: 'Chick-fil-A', cat: '炸鸡三明治', addr: '大多数枢纽机场都有', note: '出餐最快、口味最稳的一家。注意周日关门，这是美国全国惯例。' },
        { name: 'Panera Bread', cat: '汤 + 三明治', addr: '常见于大型航站楼', note: '想坐下吃口热的就它，一份汤加半个三明治出餐最快。' },
        { name: 'Chipotle', cat: '墨西哥碗', addr: '部分航站楼', note: '份量大、吃得饱，选鸡肉碗最稳。' },
        { name: "Starbucks / Dunkin'", cat: '咖啡 + 烘焙', addr: '到处都是', note: '早班机的唯一解。Dunkin 的 bagel 比星巴克的强。' },
        { name: '底特律特色：Coney Island', cat: '热狗', addr: 'DTW McNamara（Leo 或 National）', note: '只在底特律能吃到，辣椒肉酱 + 洋葱 + 芥末，值得专门试一次。' }
      ]
    },
    {
      title: '傍晚喝一杯 · 有景观的酒吧',
      note: '白天跑完景点，日落前后去这些地方坐一小时，比在餐厅排队值。',
      places: [
        { name: 'Sparrow', cat: '天台酒吧', addr: '299 N Federal Hwy（Dalmar 酒店顶楼）', note: 'Fort Lauderdale 最好的天台之一，看得到 Intracoastal 水道和整片天际线。日落前 30 分钟上去。' },
        { name: 'Rooftop @ 1WLO', cat: '天台酒吧', addr: '1 W Las Olas Blvd（11 楼）', note: '就在 Las Olas 西端，俯瞰整条街和 New River。WAF 期间人多，早点去。' },
        { name: 'Capa Bar', cat: '天台酒吧', addr: '10100 Dream Tree Blvd（Four Seasons 顶楼）', note: '和 Capa 餐厅同一层，只喝酒的话不用订餐位，站着看烟花也行。' }
      ]
    },
    {
      title: '劳德代尔堡：说句实话',
      note: '这几天的重点放在海鲜和意餐上——Fort Lauderdale 这两样做得比中餐好得多。真想换口味，Miami 的 Brickell 一带选择更多。',
      places: [
        { name: 'Coconuts', cat: '海鲜', addr: '429 Seabreeze Blvd', note: '本地人认可的海边餐厅，不是游客店。' },
        { name: 'Boatyard', cat: '海鲜 / 牛排', addr: '1555 SE 17th St', note: '运河边，离酒店最近的一家正经餐厅。' }
      ]
    }
  ],

  food: [
    {
      day: 'D1 · 11/13', area: '上海 → 底特律 → 奥兰多',
      note: '全天在交通工具上。这一天不安排餐厅——机场和飞机上能吃饱就行，把胃留给奥兰多。',
      meals: [
        { slot: '早餐', name: '浦东 T1 · 南翔小笼 / 永和大王 / 星巴克', cuisine: '机场连锁', price: '¥40–70', note: 'T1 安检后这几家都在，认准牌子点就行。想吃得像样一点就南翔的小笼和粥；赶时间拿个星巴克三明治。' },
        { slot: '午餐', name: '机上', cuisine: '飞机餐', price: '含在机票', note: '13.5 小时两顿正餐，自带坚果和黑巧补能量。' },
        { slot: '晚餐', name: '底特律 McNamara · Coney Island 热狗', cuisine: '本地连锁', price: '$12–18', note: 'Leo\'s 或 National Coney Island 是底特律自己的连锁，辣椒肉酱热狗（coney dog）加一份薯条，是这个地方最该吃的东西。不想吃热狗就 Chick-fil-A 或 Panera。' },
        { slot: '夜宵', name: '到奥兰多后不安排', cuisine: '—', price: '—', note: '23:00 落地，别折腾了。' }
      ]
    },
    {
      day: 'D2 · 11/14', area: 'Winter Park / 市中心',
      note: '早上市集解决早餐，午餐在 Park Ave，晚上进城吃顿好的。',
      meals: [
        { slot: '早餐', name: 'Winter Park 农贸市集', img: 'breakfast', cuisine: '市集现做', price: '$10–15', note: '周六限定。现烤可颂、biscuit、本地咖啡，比任何餐厅都有意思——这也是这天 8 点起床的理由。' },
        { slot: '午餐', name: 'Prato', img: 'italian', cuisine: '意式', price: '$25–40', note: '124 N Park Ave。Park Ave 上最稳的一家，手工意面；想吃新美式就换 The Ravenous Pig（565 W Fairbanks Ave）。两家都要等位。' },
        { slot: '晚餐', name: 'Kres Chophouse', img: 'steak', cuisine: '牛排 / 上档次', price: '$60–90', note: '17 W Church St，1930 年代银行大楼改造，老奥兰多最像样的一间。看完 Church Street 正好走两步就到，建议订位。' },
        { slot: '夜宵', name: "Gideon's Bakehouse", cuisine: '曲奇', price: '$8', note: 'East End Market（3201 Corrine Dr）或 Disney Springs。半磅一块的厚曲奇，下午常排队；买两块带回酒店当夜宵。' }
      ]
    },
    {
      day: 'D3 · 11/15', area: 'Blue Spring / Mount Dora',
      note: '中午在小山城的百年老酒店吃湖景，晚上回城吃一顿扎实的烧烤。',
      meals: [
        { slot: '早餐', name: '路上解决', img: 'breakfast', cuisine: '—', price: '$8', note: '7:30 出发，别指望酒店早餐。' },
        { slot: '午餐', name: 'Lakeside Inn', img: 'seafood', cuisine: '美式 / 湖景', price: '$25–40', view: true, note: '100 N Alexander St, Mount Dora。1883 年的老酒店，餐厅对着 Lake Dora，木廊和吊扇是那个年代的样子。看完跳蚤市场回来吃正好。' },
        { slot: '晚餐', name: 'The Polite Pig', img: 'barbecue', cuisine: '佛州烧烤', price: '$25–35', note: 'Disney Springs（1504 Buena Vista Dr）。本地人认可的烧烤，brisket 和猪肋排都稳，不用订位。从 Mount Dora 回来顺路。' },
        { slot: '夜宵', name: 'Gideon’s Bakehouse', img: 'icecream', cuisine: '曲奇', price: '$8', note: '和 Polite Pig 同在 Disney Springs，吃完顺路买两块带走。' }
      ]
    },
    {
      day: 'D4 · 11/16', area: '迪士尼 Animal Kingdom',
      note: '中午在园里吃，晚上出园吃全市最好的景观位。',
      meals: [
        { slot: '早餐', name: '酒店 / 园区入口', img: 'brunch', cuisine: '—', price: '$10', note: '7:40 出发，路上拿个可颂。' },
        { slot: '午餐', name: "Satu'li Canteen", cuisine: 'Pandora 碗装', price: '$18–25', note: '园内唯一值得专门吃的一家，芝士汉堡包和咖喱碗都不错。11:30 前去不排队。' },
        { slot: '晚餐', name: 'Capa', img: 'asian', cuisine: '西班牙牛排 / 天台景观', price: '$90–140', view: true, note: 'Four Seasons Orlando 顶楼（10100 Dream Tree Blvd）。全奥兰多看迪士尼烟花最好的位置，牛排和海鲜都硬。必须订位，说想要看烟花的时段（20:00 前后）。' },
        { slot: '夜宵', name: '—', img: 'steak', cuisine: '—', price: '—', note: '吃完回酒店休息。' }
      ]
    },
    {
      day: 'D5 · 11/17', area: '肯尼迪航天中心 → 劳德代尔堡',
      note: '中午只能在园区，晚上到了运河边吃海鲜。',
      meals: [
        { slot: '早餐', name: '酒店早餐', img: 'breakfast', cuisine: '—', price: '含房费', note: '走之前吃饱。' },
        { slot: '午餐', name: 'KSC 园区', img: 'burger', cuisine: '园区简餐', price: '$15–20', note: 'Orbit Cafe 是唯一像样的选择，别抱期待。' },
        { slot: '晚餐', name: 'Boatyard', img: 'seafood', cuisine: '海鲜 / 运河景观', price: '$30–45', view: true, note: '1555 SE 17th St，步行 8 分钟。厨房到 22:00，21 点到店还能点。想更讲究就换 15th Street Fisheries（1900 SE 15th St），但厨房关得早，得赶。' },
        { slot: '夜宵', name: 'Kilwins', img: 'icecream', cuisine: '冰淇淋', price: '$8', note: 'Las Olas / 17th St 都有，21:00 关。' }
      ]
    },
    {
      day: 'D6 · 11/18', area: 'WAF Day 1',
      note: '两场汇报之间别跑远，晚上好好吃一顿。',
      meals: [
        { slot: '早餐', name: 'Java & Jam', img: 'brunch', cuisine: 'Brunch', price: '$18–28', note: 'Las Olas 上，7:00 开。8:00 去海滩前吃正好。' },
        { slot: '午餐', name: 'Southport Raw Bar', img: 'oyster', cuisine: '生蚝', price: '$20–35', note: '1536 Cordova Rd。本地人吃生蚝的地方，离会场开车 10 分钟。赶时间就在会场吃。' },
        { slot: '晚餐', name: "Louie Bossi's", cuisine: '意式', price: '$40–60', note: '1032 E Las Olas Blvd。Las Olas 上最火的一家，手工意面和那不勒斯披萨。WAF 期间必须订位，提前一天打电话。' },
        { slot: '夜宵', name: '—', img: 'italian', cuisine: '—', price: '—', note: '' }
      ]
    },
    {
      day: 'D7 · 11/19', area: 'WAF Day 2',
      note: '汇报结束犒劳自己一顿意餐。',
      meals: [
        { slot: '早餐', name: '酒店 / 会场附近', cuisine: '—', price: '$12', note: '上午 11:00 讲，别折腾。' },
        { slot: '午餐', name: '会场', img: 'sandwich', cuisine: '简餐', price: '$20', note: '11:00 讲完 15:20 还要讲，中间别跑。' },
        { slot: '晚餐', name: "Casa D'Angelo", cuisine: '意式正餐', price: '$60–90', note: '1201 N Federal Hwy。本地公认最好的意餐之一，托斯卡纳菜，要订位。' },
        { slot: '夜宵', name: 'Riverside Hotel 酒吧', img: 'italian', cuisine: '酒', price: '$15–25', note: '620 E Las Olas Blvd，老酒店大堂吧，坐着聊会儿。' }
      ]
    },
    {
      day: 'D8 · 11/20', area: 'WAF Day 3 · Gala',
      note: '白天吃轻一点，晚上是 Gala。',
      meals: [
        { slot: '早餐', name: '酒店', cuisine: '—', price: '含房费', note: '' },
        { slot: '午餐', name: 'Coconuts', img: 'seafood', cuisine: '海鲜 / 海景', price: '$30–45', view: true, note: '429 Seabreeze Blvd。坐在水边看船，是本地人认可的海边餐厅，不是游客店。11:30 到能占到露台。' },
        { slot: '晚餐', name: 'Gala Dinner（会场）', img: 'steak', cuisine: '晚宴', price: '含在票里', note: '19:00 开始，17:00 有酒会，别空着肚子喝。' },
        { slot: '夜宵', name: '——', cuisine: '—', price: '—', note: '散场 22:30，回酒店。' }
      ]
    },
    {
      day: 'D9 · 11/21', area: '自由日（A 劳德代尔堡 / B 迈阿密）',
      note: '两条线都是「景观位 + 好食材」，A 看海，B 吃百年老店。',
      meals: [
        { slot: '早餐', name: 'A：O-B House ／ B：Zak the Baker', img: 'brunch', cuisine: 'Brunch ／ 烘焙', price: '$18–28', note: 'A 在市区；B 在 Wynwood，迈阿密最出名的面包店，8:00 去排队短。' },
        { slot: '午餐', name: 'A：Coconuts ／ B：Coyo Taco', img: 'taco', cuisine: '海鲜 ／ 墨西哥', price: '$30–45 / $15–25', view: false, note: 'A 海边；B 就在 Wynwood 涂鸦区旁边。' },
        { slot: '晚餐', name: 'A：Steak 954 ／ B：Joe’s Stone Crab', img: 'crab', cuisine: '牛排 ／ 百年蟹店', price: '$80–120 / $60–100', view: true, note: 'A：401 N Fort Lauderdale Beach Blvd（W 酒店内），落地窗全海景。B：11 Washington Ave, Miami Beach，1913 年开的，蟹季正好，不接受订位、17:00 前到。' },
        { slot: '夜宵', name: 'A：— ／ B：Big Pink', img: 'diner', cuisine: '— ／ 美式 diner', price: '$20–30', note: 'Big Pink 开到凌晨，South Beach 回程顺路。' }
      ]
    },
    {
      day: 'D10 · 11/22', area: '返程',
      note: '全天在路上。',
      meals: [
        { slot: '早餐', name: 'FLL 安检后 · 星巴克 / BurgerFi', img: 'sandwich', cuisine: '机场连锁', price: '$10–18', note: '6:00 退房，先让酒店打包咖啡。安检后 T2 有星巴克；想吃热的看 BurgerFi（佛州本地汉堡连锁）在不在，不在就 Panera 的汤和三明治。' },
        { slot: '午餐', name: '机上', img: 'sandwich', cuisine: '飞机餐', price: '含在机票', note: '' },
        { slot: '晚餐', name: '底特律 McNamara · Chick-fil-A / Panera', cuisine: '连锁', price: '$12–20', note: '看中转时间：够 40 分钟就坐下吃 Panera（汤 + 三明治），只够 20 分钟就在 Chick-fil-A 打包。机场里这两家最不容易踩雷。' },
        { slot: '夜宵', name: '上海落地后', cuisine: '—', price: '—', note: '回家路上随便吃点。' }
      ]
    }
  ],

  plans: [
    {
      id: 'p1',
      name: '方案一 · 全程租车',
      best: true,
      summary: '模式：全程自驾。11/13 落地取车，11/22 直接还到机场，9 天车不离手。好处是任何一段路都不用等，D5 从 KSC 出来直接开回酒店，行李箱一直有地方放。坏处是市区停车又贵又难找——D6–D8 那几天你会为了 3 公里开一趟车、付 $22 停车费，这钱花得没必要。',
      timeCost: '1 小时 40 分',
      keyCost: '零等待，但停车费高',
      tagline: '11/13 FLL 取车 → 11/22 FLL 还车，共 9 天',
      pros: [
        '全程有车，行程零等待，D5 从 KSC 直接开回酒店',
        'D2 赖特校园线（Lakeland 单程 1 小时）必须开车，这个方案最省事',
        '行李跟着车走，11/17 换酒店不用拖箱子',
        '两人以上摊下来最便宜'
      ],
      cons: [
        '劳德代尔堡市区停车贵且难，D6–D8 的 3–5 公里短途开车不划算',
        'D9 去迈阿密遇早晚高峰会堵',
        '要多买一份保险（LDW 约 $15/天）'
      ],
      cost: [
        { k: '租车 9 天（经济型卡罗拉）', v: '$400–470' },
        { k: '保险 LDW（$15/天）', v: '$135' },
        { k: '油费（约 950 英里）', v: '$95–110' },
        { k: '过路费 SunPass（含 KSC、迈阿密）', v: '$35–45' },
        { k: '停车（奥兰多 4 晚约 $20/晚 + FLL 5 晚 $10/晚 + 景点）', v: '$190–225' }
      ],
      total: '$860–995',
      perPerson: '两人约 $430–498/人',
      hidden: [
        { k: 'D1 机场取车', v: '约 50 分钟（租车中心 shuttle 15 分钟 + 排队取车 35 分钟）。已在 D1 行程里。' },
        { k: 'D10 机场还车', v: '约 35 分钟（还车 20 分钟 + shuttle 到航站楼 15 分钟）。反正要去机场，不算绕路。' },
        { k: '市区找车位', v: '每次 10–15 分钟，D6–D9 大约 6 次，累计约 1 小时。' },
        { k: '加油', v: '2–3 次，每次 10 分钟，顺路。' },
        { k: '合计', v: '多花约 1 小时 40 分，无额外打车费。' }
      ],
      detail: [
      { day: 'D1', date: '11/13', lines: [
        { t: '19:30', what: 'FLL 取车（经济型，含税费）', cost: '$45' },
        { t: '20:00', what: '首箱油', cost: '$45' },
        { t: '23:00', what: '酒店停车', cost: '$20' }
      ], sum: '$110' },
      { day: 'D2', date: '11/14', lines: [
        { t: '08:00', what: '租车（当天）', cost: '$45' },
        { t: '08:30', what: '市集停车场（2 小时免费）', cost: '$0' },
        { t: '11:30', what: 'Park Ave 街边停车', cost: '$8' },
        { t: '19:00', what: '晚餐停车', cost: '$6' }
      ], sum: '$59' },
      { day: 'D3', date: '11/15', lines: [
        { t: '07:30', what: '租车（当天）', cost: '$45' },
        { t: '09:00', what: 'Blue Spring 门票（按车）', cost: '$6' }
      ], sum: '$51' },
      { day: 'D4', date: '11/16', lines: [
        { t: '07:40', what: '租车（当天）', cost: '$45' },
        { t: '08:30', what: '迪士尼停车日票', cost: '$30' },
        { t: '18:00', what: '加油', cost: '$35' }
      ], sum: '$110' },
      { day: 'D5', date: '11/17', lines: [
        { t: '07:30', what: '租车（当天）', cost: '$45' },
        { t: '09:00', what: 'KSC 停车', cost: '$10' },
        { t: '17:15', what: '过路费 FL-528 + Turnpike', cost: '$12' },
        { t: '18:30', what: '加油（Fort Pierce）', cost: '$40' }
      ], sum: '$107' },
      { day: 'D6', date: '11/18', lines: [
        { t: '08:00', what: '租车（当天）', cost: '$45' },
        { t: '08:30', what: '酒店停车', cost: '$22' },
        { t: '17:00', what: 'Las Olas 停车', cost: '$10' }
      ], sum: '$77' },
      { day: 'D7', date: '11/19', lines: [
        { t: '08:00', what: '租车（当天）', cost: '$45' },
        { t: '18:00', what: '酒店停车', cost: '$22' }
      ], sum: '$67' },
      { day: 'D8', date: '11/20', lines: [
        { t: '09:00', what: '租车（当天）', cost: '$45' },
        { t: '13:00', what: 'Bonnet House 停车', cost: '$5' },
        { t: '17:00', what: '会场停车', cost: '$22' }
      ], sum: '$72' },
      { day: 'D9', date: '11/21', lines: [
        { t: '09:00', what: '租车（当天）', cost: '$45' },
        { t: '10:30', what: 'Wynwood 停车', cost: '$20' },
        { t: '15:00', what: 'South Beach 停车', cost: '$15' },
        { t: '18:00', what: '过路费 + 加油', cost: '$35' }
      ], sum: '$115' },
      { day: 'D10', date: '11/22', lines: [
        { t: '06:00', what: '租车（当天）', cost: '$45' },
        { t: '06:15', what: '还车前加满', cost: '$25' },
        { t: '06:40', what: '过路费', cost: '$8' }
      ], sum: '$78' }
      ],
      verdict: '最省心，也是最贵。适合不想为交通操心的玩法。'
    },
    {
      id: 'p2',
      name: '方案二 · 只租前半程',
      best: false,
      summary: '模式：前半程自驾、后半程打车。只在奥兰多那几天（11/13–11/17）用车，把这趟最需要车的三段路——Lakeland 赖特校园、KSC、Blue Spring——全部覆盖，D5 晚上在机场还车，之后在劳德代尔堡全程打车。这是「花最少的钱覆盖最难的路线」的切法，代价是还车那 40 分钟的折腾，以及 D9 去迈阿密要依赖火车。',
      timeCost: '2 小时 40 分',
      keyCost: '覆盖所有长途，后半程打车',
      tagline: 'D1 取车，D5 晚上 FLL 还车；D6–D10 打车 + 公共交通',
      pros: [
        '省钱：租车只付 5 天，省掉一半租车费和保险',
        'D6–D8 在劳德代尔堡开会，本来就不需要车：打车 3–5 公里 $12–18，酒店门口的 Sun Trolley 只要 $1/人',
        '还车当天晚上就能把车脱手，之后喝酒也不担心'
      ],
      cons: [
        'D5 从 KSC 回来先还车再回酒店，多花 40 分钟',
        'D9 去迈阿密只能靠 Brightline 或包车，灵活性差',
        '两次叫车高峰（Gala 晚上散场）可能等 15 分钟以上'
      ],
      cost: [
        { k: '租车 5 天', v: '$225–260' },
        { k: '保险 5 天', v: '$75' },
        { k: '油费（约 620 英里）', v: '$60–70' },
        { k: '过路费', v: '$25–30' },
        { k: '停车（奥兰多 4 晚 + 景点）', v: '$120–150' },
        { k: 'D6–D10 打车（约 10 程）', v: '$140–190' },
        { k: 'D9 迈阿密往返（Brightline 两人）', v: '$80–120' }
      ],
      total: '$700–925',
      perPerson: '两人约 $350–463/人',
      hidden: [
        { k: 'D5 绕去机场还车', v: '从 KSC 回来先去 FLL 机场（比直接回酒店多绕 10 分钟）。' },
        { k: 'D5 还车流程', v: '约 25 分钟（停车楼还车 + 交接）。' },
        { k: 'D5 还车后回酒店', v: '酒店有免费 FLL 机场班车（05:00–23:45），还完车坐班车回去，$0，但可能要等 20–30 分钟。赶时间就打车 $10–14。' },
        { k: 'D5 到店时间', v: '约 21:10，比全程租车晚 40 分钟。Boatyard 厨房 22:00 关，到店会更赶。' },
        { k: 'D5 体力', v: '当天已开 5.5 小时车，还车前后还要搬行李，比较累。' },
        { k: 'D6–D10 等车', v: '10 程打车，平均等 8 分钟，累计约 1 小时 20 分；Gala 散场高峰可能等 20 分钟。' },
        { k: 'D9 迈阿密往返', v: 'Brightline 要提前 20 分钟到站，往返多花约 40 分钟。' },
        { k: '合计', v: '多花约 2 小时 40 分，额外打车费 $0–14（坐酒店免费班车就是 $0）。' }
      ],
      detail: [
      { day: 'D1', date: '11/13', lines: [
        { t: '19:30', what: 'FLL 取车（5 天）', cost: '$45' },
        { t: '20:00', what: '首箱油', cost: '$45' },
        { t: '23:00', what: '酒店停车', cost: '$20' }
      ], sum: '$110' },
      { day: 'D2', date: '11/14', lines: [
        { t: '08:00', what: '租车（当天）', cost: '$45' },
        { t: '08:30', what: '市集停车（免费 2 小时）', cost: '$0' },
        { t: '11:30', what: 'Park Ave 停车', cost: '$8' },
        { t: '18:00', what: '加油', cost: '$30' }
      ], sum: '$83' },
      { day: 'D3', date: '11/15', lines: [
        { t: '07:30', what: '租车（当天）', cost: '$45' },
        { t: '09:00', what: 'Blue Spring 门票（按车）', cost: '$6' }
      ], sum: '$51' },
      { day: 'D4', date: '11/16', lines: [
        { t: '07:40', what: '租车（当天）', cost: '$45' },
        { t: '08:30', what: '迪士尼停车', cost: '$30' },
        { t: '18:00', what: '加油', cost: '$25' }
      ], sum: '$100' },
      { day: 'D5', date: '11/17', lines: [
        { t: '07:30', what: '租车（当天，最后一天）', cost: '$45' },
        { t: '09:00', what: 'KSC 停车', cost: '$10' },
        { t: '17:15', what: '过路费', cost: '$12' },
        { t: '20:30', what: '机场还车', cost: '$0' },
        { t: '21:00', what: '还车后坐酒店免费班车回（或打车）', cost: '$0–12' }
      ], sum: '$79' },
      { day: 'D6', date: '11/18', lines: [
        { t: '08:10', what: '酒店 → Las Olas 打车', cost: '$12' },
        { t: '17:30', what: '会场 → 晚餐打车', cost: '$14' }
      ], sum: '$26' },
      { day: 'D7', date: '11/19', lines: [
        { t: '09:00', what: '酒店 → 会场打车', cost: '$12' },
        { t: '19:00', what: '晚餐往返打车', cost: '$20' }
      ], sum: '$32' },
      { day: 'D8', date: '11/20', lines: [
        { t: '09:30', what: '酒店 → 海滩打车', cost: '$16' },
        { t: '13:00', what: '海滩 → Bonnet 打车', cost: '$9' },
        { t: '22:30', what: 'Gala 散场打车（高峰加价）', cost: '$22' }
      ], sum: '$47' },
      { day: 'D9', date: '11/21', lines: [
        { t: '09:00', what: 'Brightline 往返迈阿密（两人）', cost: '$100' },
        { t: '10:30', what: '迈阿密本地打车 3 程', cost: '$45' },
        { t: '19:00', what: '回酒店打车', cost: '$15' }
      ], sum: '$160' },
      { day: 'D10', date: '11/22', lines: [
        { t: '05:40', what: '酒店 → FLL 打车', cost: '$18' }
      ], sum: '$18' }
      ],
      verdict: '性价比最好。省下的钱够吃两顿好的，代价是 D9 那天自由度下降。'
    },
    {
      id: 'p3',
      name: '方案三 · 火车 + 奥兰多租车',
      summary: '模式：火车接驳 + 目的地租车。不动 FLL 到奥兰多那段长途高速，改坐 Brightline，到奥兰多再租 4 天车。租车费确实最低，但两头都在赶：D2 早上要赶车、取车，D5 闭园后要赶末班车。省下的钱换不回损失的时间。',
      timeCost: '6 小时 30 分',
      keyCost: 'D2 半天报废，赶车风险高',
      tagline: 'D1 住机场，D2 早班火车去奥兰多，当地租车；D5 还车坐火车回',
      best: false,
      pros: [
        '全程租车天数最少（D2–D5 共 4 天），租车费用最低',
        '不用开 FLL→奥兰多那 3 小时高速，两个人都轻松',
        'D1 到得晚就直接住机场，没有赶路压力'
      ],
      cons: [
        'D1 要多住一晚机场酒店（$120–160）',
        'D2 上午基本报废：火车 + 取车吃掉半天，Winter Park 市集和博物馆去不了',
        'D5 必须卡点：KSC 17:00 闭园 → 还车 → 赶末班火车，错过就只能住奥兰多',
        '行李要跟着火车搬两次'
      ],
      cost: [
        { k: 'D1 机场酒店 1 晚', v: '$120–160' },
        { k: 'Brightline FLL→奥兰多（两人）', v: '$80–110' },
        { k: '奥兰多租车 4 天', v: '$180–210' },
        { k: '保险 4 天', v: '$60' },
        { k: '油费 + 过路', v: '$60–75' },
        { k: '停车（奥兰多 4 晚）', v: '$80–100' },
        { k: 'Brightline 回 FLL（两人）', v: '$80–110' },
        { k: 'D6–D10 打车', v: '$140–190' }
      ],
      total: '$820–985',
      perPerson: '两人约 $410–493/人',
      hidden: [
        { k: 'D1 机场酒店 shuttle', v: '等车 20 分钟，免费。' },
        { k: 'D2 取车', v: 'MCO 站到租车中心 shuttle 10 分钟 + 取车 30 分钟 = 40 分钟。' },
        { k: 'D5 还车到车站', v: '还车 25 分钟 + 打车到 Orlando 车站 $8–12（3 公里）。' },
        { k: 'D5 候车', v: '至少提前 20 分钟到站。' },
        { k: 'D6–D10 等车', v: '同方案二，约 1 小时 20 分。' },
        { k: '合计', v: 'D2 损失约 4 小时、D5 损失约 2.5–3 小时，额外打车费 $20–30。' }
      ],
      detail: [
      { day: 'D1', date: '11/13', lines: [
        { t: '19:30', what: '机场酒店 shuttle（免费，等 20 分钟）', cost: '$0' },
        { t: '20:00', what: '机场附近酒店 1 晚', cost: '$140' }
      ], sum: '$140' },
      { day: 'D2', date: '11/14', lines: [
        { t: '07:30', what: 'Brightline FLL→奥兰多（两人）', cost: '$90' },
        { t: '12:00', what: 'MCO 站 → 租车中心 shuttle', cost: '$0' },
        { t: '12:20', what: '奥兰多取车（4 天）', cost: '$45' },
        { t: '13:00', what: '第一箱油', cost: '$40' },
        { t: '14:00', what: 'Park Ave 停车', cost: '$8' }
      ], sum: '$183' },
      { day: 'D3', date: '11/15', lines: [
        { t: '07:30', what: '租车（当天）', cost: '$45' },
        { t: '09:00', what: 'Blue Spring 门票', cost: '$6' }
      ], sum: '$51' },
      { day: 'D4', date: '11/16', lines: [
        { t: '07:40', what: '租车（当天）', cost: '$45' },
        { t: '08:30', what: '迪士尼停车', cost: '$30' },
        { t: '18:00', what: '加油', cost: '$25' }
      ], sum: '$100' },
      { day: 'D5', date: '11/17', lines: [
        { t: '07:30', what: '租车（当天，最后一天）', cost: '$45' },
        { t: '09:00', what: 'KSC 停车', cost: '$10' },
        { t: '17:15', what: '过路费', cost: '$12' },
        { t: '18:30', what: '还车前加满', cost: '$30' },
        { t: '19:00', what: '奥兰多还车', cost: '$0' },
        { t: '19:20', what: '打车到 Orlando 车站（3 km）', cost: '$10' },
        { t: '20:00', what: 'Brightline 回 FLL（两人）', cost: '$90' }
      ], sum: '$197' },
      { day: 'D6', date: '11/18', lines: [
        { t: '08:10', what: '酒店 → 会场打车', cost: '$12' },
        { t: '17:30', what: '晚餐往返', cost: '$20' }
      ], sum: '$32' },
      { day: 'D7', date: '11/19', lines: [
        { t: '09:00', what: '酒店 → 会场打车', cost: '$12' },
        { t: '19:00', what: '晚餐往返', cost: '$20' }
      ], sum: '$32' },
      { day: 'D8', date: '11/20', lines: [
        { t: '09:30', what: '酒店 → 海滩打车', cost: '$16' },
        { t: '13:00', what: '海滩 → Bonnet 打车', cost: '$9' },
        { t: '22:30', what: 'Gala 散场打车', cost: '$22' }
      ], sum: '$47' },
      { day: 'D9', date: '11/21', lines: [
        { t: '09:00', what: 'Brightline 往返迈阿密（两人）', cost: '$100' },
        { t: '10:30', what: '迈阿密本地打车', cost: '$45' },
        { t: '19:00', what: '回酒店打车', cost: '$15' }
      ], sum: '$160' },
      { day: 'D10', date: '11/22', lines: [
        { t: '05:40', what: '酒店 → FLL 打车', cost: '$18' }
      ], sum: '$18' }
      ],
      verdict: '钱没省多少，时间赔进去不少。除非你特别讨厌开长途，否则不推荐。'
    }
,
    {
      id: 'p4',
      name: '方案四 · 完全不租车',
      summary: '模式：一次方向盘都不碰。全程 Brightline + 打车 + 步行。听起来最轻松，实际上是四个里最贵的：长距离打车（KSC 往返 $210、Blue Spring 往返 $130）把租车省下的钱全吃回去了，而且 Lakeland 和 Mount Dora 这两个点直接去不了。',
      timeCost: '约 6 小时',
      keyCost: '最贵，还要砍两个目的地',
      tagline: '全程打车 + Brightline + 公共交通，一次方向盘都不碰',
      best: false,
      pros: [
        '不用操心停车、加油、还车，全程都可以喝酒',
        'D6–D10 在劳德代尔堡活动，本来就不需要车',
        '路上不用当司机，两个人都能休息'
      ],
      cons: [
        'D1 太晚到不了奥兰多，必须多住一晚机场酒店（和方案三一样）',
        '⚠️ D2 的 Lakeland 赖特校园基本去不了：打车往返 $300',
        'D5 从 KSC 打车往返约 $210，是全表最贵的一段',
        'D3 去 Blue Spring 打车 $130，回程可能叫不到车；Mount Dora 去不了',
        '换酒店全靠手拎行李，11/17 和 11/20 会比较狼狈'
      ],
      cost: [
        { k: '机场酒店 1 晚（D1）', v: '$140' },
        { k: 'Brightline FLL↔奥兰多（两人 2 程）', v: '$180' },
        { k: '奥兰多 + KSC 长距离打车', v: '$330–400' },
        { k: '迪士尼往返打车', v: '$60' },
        { k: 'D6–D8 劳德代尔堡打车', v: '$110–130' },
        { k: 'D9 迈阿密（火车 + 打车）', v: '$160' },
        { k: '机场往返打车', v: '$40' }
      ],
      total: '$1,020–1,150',
      perPerson: '两人约 $510–575/人',
      hidden: [
        { k: 'D1 被迫多住一晚', v: '落地 18:40，出关取行李约 1 小时，赶不上当晚去奥兰多的末班火车。' },
        { k: 'D2 损失半天', v: '火车 + 打车进城，到 Winter Park 已过 12:30，市集和博物馆作废。' },
        { k: 'D3 叫车风险', v: 'Blue Spring 在郊区，回程可能要等 20–30 分钟；Mount Dora 干脆去不了。' },
        { k: 'D5 全天最贵', v: 'KSC 没有公共交通，单程 70 分钟约 $105，往返 $210。' },
        { k: '合计', v: '多花约 6 小时，还要放弃 Lakeland 和 Mount Dora 两个目的地；总价反而和方案一持平。' }
      ],
      verdict: '最像"自由行"，其实是约束最多的一个：钱没省、时间最贵、还得砍掉两个目的地。',
      detail: [
        { day: 'D1', date: '11/13', lines: [
          { t: '19:30', what: 'FLL 落地，机场 shuttle 到酒店（免费）', cost: '$0' },
          { t: '20:00', what: '机场附近酒店 1 晚（末班车已过）', cost: '$140' }
        ], sum: '$140' },
        { day: 'D2', date: '11/14', lines: [
          { t: '07:30', what: 'Brightline FLL→奥兰多（两人）', cost: '$90' },
          { t: '12:00', what: 'MCO 站 → Winter Park 打车', cost: '$22' },
          { t: '17:30', what: '市区内两程打车', cost: '$15' },
          { t: '19:30', what: '回酒店打车', cost: '$18' },
          { t: '—', what: '⚠️ Lakeland 赖特校园去不了（打车单程 $130–160）', cost: '$0' }
        ], sum: '$145' },
        { day: 'D3', date: '11/15', lines: [
          { t: '07:30', what: '打车去 Blue Spring（45 分钟）', cost: '$65' },
          { t: '12:00', what: '回程打车', cost: '$65' },
          { t: '15:00', what: 'Mount Dora 无车去不了', cost: '$0' }
        ], sum: '$130' },
        { day: 'D4', date: '11/16', lines: [
          { t: '07:40', what: '打车去 Animal Kingdom', cost: '$30' },
          { t: '19:00', what: '闭园后打车回酒店', cost: '$30' }
        ], sum: '$60' },
        { day: 'D5', date: '11/17', lines: [
          { t: '07:30', what: '打车去 KSC（70 分钟）', cost: '$105' },
          { t: '17:00', what: '闭园打车回奥兰多站', cost: '$105' },
          { t: '20:00', what: 'Brightline 回 FLL（两人）', cost: '$90' }
        ], sum: '$300' },
        { day: 'D6', date: '11/18', lines: [
          { t: '08:10', what: '酒店 → 会场打车', cost: '$12' },
          { t: '17:30', what: '晚餐往返', cost: '$20' }
        ], sum: '$32' },
        { day: 'D7', date: '11/19', lines: [
          { t: '09:00', what: '酒店 → 会场打车', cost: '$12' },
          { t: '19:00', what: '晚餐往返', cost: '$20' }
        ], sum: '$32' },
        { day: 'D8', date: '11/20', lines: [
          { t: '09:30', what: '酒店 → 海滩打车', cost: '$16' },
          { t: '13:00', what: '海滩 → Bonnet 打车', cost: '$9' },
          { t: '22:30', what: 'Gala 散场打车', cost: '$22' }
        ], sum: '$47' },
        { day: 'D9', date: '11/21', lines: [
          { t: '09:00', what: 'Brightline 往返迈阿密（两人）', cost: '$100' },
          { t: '10:30', what: '迈阿密本地打车', cost: '$45' },
          { t: '19:00', what: '回酒店打车', cost: '$15' }
        ], sum: '$160' },
        { day: 'D10', date: '11/22', lines: [
          { t: '05:40', what: '酒店 → FLL 打车', cost: '$18' }
        ], sum: '$18' }
      ]
    }
  ],

  plansSummary: {
    title: '我的判断：这四个方案到底差在哪',
    paras: [
      '四个方案的差别只有一个变量——【租几天车】。不是"租不租"，而是"哪几天需要车"。',
      '这趟真正的长途只有三段：D2 去 Lakeland（单程 1 小时）、D5 去 KSC（单程 1 小时 10 分）、D3 去 Blue Spring（单程 45 分钟）。这三段没有公共交通替代，打车单程都在 $65–160 之间，必须开车。',
      '反过来，D6–D8 在劳德代尔堡开会，活动半径 2–4 公里。这三天确实是打车更划算——但只省 $100 出头，代价是每次出门都要等 5–15 分钟、Gala 散场可能要等 20 分钟。',
      '把两个方案的中位数摆一起：方案一约 $970，方案二约 $850。差 $120，摊到 10 天是每天 $12。用每天 $12 换"随时能走、不用还车、行李不用搬"，这笔买卖很划算。'
    ],
    table: [
      { plan: '方案一 · 全程租车', cost: '$900–1,040', time: '1 小时 40 分', key: '零等待，只多付停车费' },
      { plan: '方案二 · 只租前半程', cost: '$737–960', time: '2 小时 40 分', key: '省约 $120，代价是 D5 还车 + 全程等车' },
      { plan: '方案三 · 火车 + 当地租车', cost: '$820–985', time: '6 小时 30 分', key: 'D2 半天报废，赶车风险高' },
      { plan: '方案四 · 完全不租车', cost: '$1,020–1,150', time: '约 6 小时', key: '最贵，还要砍两个目的地' }
    ],
    pick: '方案一 · 全程租车',
    why: '它只比方案二贵约 $120（中位数 $970 对 $850），却是四个里唯一"完全不用迁就交通工具"的：D5 从 KSC 出来直接开回酒店吃饭，D6–D8 想什么时候走就什么时候走，D9 去迈阿密不看火车时刻表，行李箱永远在车上。这趟旅行有 6 天在开会，剩下的时间很宝贵，不该花在等车上。',
    switchTo: [
      { when: '如果你的酒店停车免费，或你愿意把车停在街上', then: '方案一的成本会再降 $100 左右，性价比更明显，闭眼选它。' },
      { when: '如果你更在意省钱，且不介意每次出门等车', then: '选方案二。省 $120，D5 晚上还车会累一点，D9 要按 Brightline 时刻表走。' },
      { when: '如果你完全不想开车，且愿意放弃 Lakeland', then: '选方案三。D2 改成 Winter Park 深度游（市集 + Morse + 游船），不再跑 Lakeland，时间就不会白白损失。' }
    ],
    notRecommended: '方案四不建议。它唯一的好处是不用开车，但为此要多付 $40–200，还要砍掉 Lakeland 和 Mount Dora 两个目的地。'
  },

  planningNotes: [
    {
      title: '租车费率与比价（FLL 实况）',
      items: [
        { k: 'FLL 的附加费很重', v: '除了基础日租，还要加：机场特许经营费（concession recovery fee）、每日设施费、佛州 $2/天租车税、以及 7% 销售税（6% 州税 + 1% Broward 附加）。合计通常把标价抬高三到四成。' },
        { k: '所以要看「含税总价」', v: '各平台首页显示的日租是未含税价。Hertz 在 FLL 的挂牌价约 $47–52/天（含税口径，2026 年 10 月第三方聚合数据），经济型落在 $45–55/天是合理区间。' },
        { k: '同日期比 FLL 和 MIA', v: '同一台车在迈阿密机场可能便宜或贵 $10–20/天，值得顺手比一下。' },
        { k: '机场外租车能省机场费', v: 'Green Motion、U-Save、Easirent 在 Rental Car Center 的 Zone G 有免费接驳，市区网点则完全绕开机场附加费，但车况和排队时间要打折扣。' },
        { k: '自己加满油还车', v: '租车公司的代加油价格通常远高于加油站。还车前在机场附近加满，能省 $20–40。' },
        { k: '保险别重复买', v: '很多信用卡自带租车损伤险（CDW），但都不含责任险（liability）。先查自己的卡，再决定要不要在柜台加。' }
      ]
    },
    {
      title: '哪些路段不该开车',
      items: [
        { k: 'D2 · Winter Park 镇内', v: '不要开。Park Ave 一带停车 $5–10/小时，镇上走 10 分钟就到，车反而是负担。把车停在市集停车场（200 W New England Ave，免费 2 小时）然后走路。' },
        { k: 'D6–D8 · 劳德代尔堡开会期间', v: '不要开。会场、酒店、Las Olas 之间 2–4 公里，打车 $10–15；酒店停车 $22/晚。方案二就是按这个算的。' },
        { k: 'D9 · 迈阿密', v: '不建议开。Wynwood 和 South Beach 停车 $20–40，还容易堵。方案一可以开，但要预留 40 分钟找车位。' },
        { k: 'D2 赖特线 · Lakeland', v: '必须开。单程 1 小时、公共交通要 4 小时以上，打车单程 $130–160。' },
        { k: 'D5 · KSC', v: '必须开。没有公共交通，打车往返 $200+。' }
      ]
    },
    {
      title: '方案三的时间账（按你的要求逐天算）',
      items: [
        { k: 'D2 损失约 4 小时', v: '08:00 酒店→FLL 站 20 分钟 + 候车 20 分钟 + 火车 3 小时 + MCO 取车 40 分钟 = 12:20 才开上车。原本 09:05 出发、12:15 已经在 Winter Park 吃午饭。等于市集（周六限定）、Morse 博物馆、运河游船全部作废。' },
        { k: 'D5 损失约 2.5–3 小时', v: '17:00 闭园 → 开回奥兰多站 60 分钟 → 还车 25 分钟 → 候车 30 分钟 → 火车 2.5 小时 → FLL 站到酒店 20 分钟 = 约 22:40 到店。方案一是 20:30。而且末班车约 19:00–20:00，还车稍慢就赶不上，风险很高。' },
        { k: '额外风险', v: 'Brightline 需要提前订票，末班没赶上当晚只能住奥兰多，第二天再南下会打乱 D6 上午的会。' }
      ]
    }
  ],

  tickets: [
    { id: 'ksc', name: '肯尼迪航天中心 一日票', sight: '肯尼迪航天中心', day: 'D5 · 11/17', status: 'todo', price: '$75 左右', url: 'https://www.kennedyspacecenter.com/', note: '官网买一日票，含园区巴士和土星五号中心。提前一周买，现场排队 30 分钟起。' },
    { id: 'ak', name: '迪士尼 Animal Kingdom 门票', sight: '迪士尼 Animal Kingdom', day: 'D4 · 11/16', status: 'todo', price: '$140–160', url: 'https://disneyworld.disney.go.com/admission/', note: '还要在 My Disney Experience 里预约入园日期（Park Reservation），光买票进不去。' },
    { id: 'blue', name: 'Blue Spring 皮划艇导览', sight: 'Blue Spring State Park', day: 'D3 · 11/15', status: 'todo', price: '$60–80/人', url: 'https://www.floridastateparks.org/parks-and-trails/blue-spring-state-park', note: '公园门票另算（约 $6/车）。皮划艇要找本地运营方订，海牛季名额紧，尽量提前订。' },
    { id: 'kings', name: 'Kings Landing 划船（备选）', sight: 'Kings Landing', day: 'D3 · 11/15', status: 'todo', price: '$35–45/人', url: 'https://kingslandingfl.com/', note: 'Rock Springs Run 上游，只能提前网上预约，不接受现场。和 Blue Spring 二选一。' },
    { id: 'morse', name: 'Morse Museum 门票', sight: 'Morse Museum of American Art', day: 'D2 · 11/14', status: 'todo', price: '$6 左右', url: 'https://morsemuseum.org/', note: '现场买就行。周五傍晚常有免费时段，以官网公告为准。' },
    { id: 'boattour', name: 'Scenic Boat Tour 船票', sight: 'Winter Park Scenic Boat Tour', day: 'D2 · 11/14', status: 'todo', price: '$20 左右', url: 'https://www.scenicboattours.com/', note: '现场买票，整点发船。旺季提前 15 分钟到码头排队。' },
    { id: 'fsc', name: 'Florida Southern College 导览', sight: 'Florida Southern College（赖特校园）', day: 'D2 · 11/14（方案 B）', status: 'todo', price: 'Basic $45 / In-depth $70', url: 'https://www.flsouthern.edu/visit', note: '只在游客中心订，必须提前 24 小时。每天 10:00 和 14:00 两场 Basic，13:00 一场 In-depth。' },
    { id: 'bonnet', name: 'Bonnet House 门票', sight: 'Bonnet House Museum & Gardens', day: 'D8 · 11/20', status: 'todo', price: '$30', url: 'https://www.bonnethouse.org/', note: '周二–周日 11:00–16:00，周一闭馆。最后入场 16:00。' },
    { id: 'nsu', name: 'NSU Art Museum 门票', sight: 'NSU Art Museum', day: 'D7 · 11/19', status: 'todo', price: '$15', url: 'https://nsuartmuseum.org/', note: '周四延时至 20:00，其他日 17:00 关。' },
    { id: 'vizcaya', name: 'Vizcaya 门票', sight: 'Vizcaya Museum & Gardens', day: 'D9 · 11/21（方案 B）', status: 'todo', price: '$25', url: 'https://www.vizcaya.org/', note: '必须提前网上订，现场常售完。周二闭馆。' },
    { id: 'hc', name: 'Orange County History Center 门票', sight: 'Orange County Regional History Center', day: 'D2 · 11/14', status: 'todo', price: '$10 左右', url: 'https://www.thehistorycenter.org/', note: '就在图书馆旁边。只看建筑的话大厅免费区就够。' },
    { id: 'wynwood', name: 'Wynwood Walls 门票', sight: 'Wynwood Walls', day: 'D9 · 11/21（方案 B）', status: 'todo', price: '$15', url: 'https://thewynwoodwalls.com/', note: '现场买也行，上午人少。外围街区免费。' },
    { id: 'watertaxi', name: 'Water Taxi 一日票', sight: 'Water Taxi（运河水上巴士）', day: 'D9 · 11/21（方案 A）', status: 'todo', price: '$35', url: 'https://watertaxi.com/', note: '一日票可随时上下船，当天在码头或官网买都行。' }
  ],

  hotels: [
    {
      name: '奥兰多酒店（待定）',
      status: '待定',
      icon: '🏨',
      checkIn: '2026-11-13',
      checkOut: '2026-11-17',
      nights: 4,
      area: '奥兰多市中心 / Winter Park 一带',
      note: '⚠️ 还没订。前两天活动都在 Winter Park 和市区，选这两处附近最省事；自驾的话一定要带停车位。如果走 D1 方案 B（今晚住机场），这里就改成 11/14 入住、3 晚。订好把 status 改成「已定」。'
    },
    {
      name: '机场过渡酒店（可选，仅 D1 方案 B）',
      status: '待定',
      icon: '🛬',
      checkIn: '2026-11-13',
      checkOut: '2026-11-14',
      nights: 1,
      area: 'FLL 机场 / 17th Street 一带',
      note: '只有走 D1 方案 B（当晚不开去奥兰多）才需要。可以直接订 17th Street 那家 Holiday Inn Express，跟后面 WAF 住的是同一家，熟门熟路。走方案 A 就不需要这条。'
    },
    {
      name: 'Holiday Inn Express Ft. Lauderdale Cruise-Airport',
            parking: '过夜自助停车 $10/晚（含进出权限，室外，102 个车位）',
            shuttle: '免费 FLL 机场班车，05:00–23:45，每天运行',
            transit: '门口就是 Sun Trolley，$1/人，环线经过海滩、Galleria、Las Olas',
      status: '已定',
      icon: '🏨',
      checkIn: '2026-11-17',
      checkOut: '2026-11-22',
      nights: 5,
      area: '1500 SE 17th St Causeway, Fort Lauderdale, FL 33316',
      note: '离会展中心 0.5 英里（走路 12 分钟），离 FLL 机场 2 英里。停车费入住时确认一下；车可以一直停在酒店，会场走路去。11/22 早上退房去机场。'
    }
  ],
  /* ------------------------------- 景点 -------------------------------- */
  sights: [
    {
      ord: 'D2-02',
      photos: [
        { t: 'img/sights/rollins-1-t.jpg', m: 'img/sights/rollins-1-m.jpg', f: 'img/sights/rollins-1.jpg' },
        { t: 'img/sights/rollins-2-t.jpg', m: 'img/sights/rollins-2-m.jpg', f: 'img/sights/rollins-2.jpg' },
        { t: 'img/sights/rollins-3-t.jpg', m: 'img/sights/rollins-3-m.jpg', f: 'img/sights/rollins-3.jpg' }
      ],
      name: 'Rollins College',
      icon: '🎓',
      day: 'D2 · 11/14',
      hours: '校园全天开放；Cornell Fine Arts Museum 周四–周日，免费',
      plan: [
        '从 Holt Ave 正门进，沿主轴线走到 Lake Virginia 湖边（10 分钟）',
        '红砖 + 西班牙殖民复兴风格，重点看 Knowles Memorial Chapel',
        '博物馆 30–40 分钟够，展览不大但质量不错'
      ],
      note: '校园在 Winter Park 中心，出去就是 Park Ave，动线很顺。'
    },
    {
      ord: 'D2-08',
      photos: [
        { t: 'img/sights/library-1-t.jpg', m: 'img/sights/library-1-m.jpg', f: 'img/sights/library-1.jpg' },
        { t: 'img/sights/library-2-t.jpg', m: 'img/sights/library-2-m.jpg', f: 'img/sights/library-2.jpg' },
        { t: 'img/sights/library-3-t.jpg', m: 'img/sights/library-3-m.jpg', f: 'img/sights/library-3.jpg' }
      ],
      name: 'Orlando Public Library',
      icon: '📚',
      day: 'D2 · 11/14',
      hours: '约 10:00–18:00（各日不同，以官网为准）',
      plan: ['1 楼主厅的玻璃中庭抬头看', '2–3 楼有本地历史和艺术类藏书', '门口广场有水景，是市区打卡点'],
      note: '离 Lake Eola 步行 8 分钟，两个点连着逛。'
    },
    {
      ord: 'D2-10',
      photos: [
        { t: 'img/sights/eola-1-t.jpg', m: 'img/sights/eola-1-m.jpg', f: 'img/sights/eola-1.jpg' },
        { t: 'img/sights/eola-2-t.jpg', m: 'img/sights/eola-2-m.jpg', f: 'img/sights/eola-2.jpg' },
        { t: 'img/sights/eola-3-t.jpg', m: 'img/sights/eola-3-m.jpg', f: 'img/sights/eola-3.jpg' }
      ],
      name: 'Lake Eola Park',
      icon: '🦢',
      day: 'D2 · 11/14',
      hours: '公园全天；天鹅船约 10:00–19:00',
      plan: ['环湖步道一圈 1.2 公里，25 分钟慢走', '天鹅船 30 分钟约 $15/船', '傍晚喷泉配市中心天际线是拍照点'],
      note: '周日下午有露天市集，人多但热闹。'
    },
    {
      ord: 'D2-12',
      photos: [
        { t: 'img/sights/fsc-1-t.jpg', m: 'img/sights/fsc-1-m.jpg', f: 'img/sights/fsc-1.jpg' },
        { t: 'img/sights/fsc-2-t.jpg', m: 'img/sights/fsc-2-m.jpg', f: 'img/sights/fsc-2.jpg' },
        { t: 'img/sights/fsc-3-t.jpg', m: 'img/sights/fsc-3-m.jpg', f: 'img/sights/fsc-3.jpg' }
      ],
      ticketId: 'fsc',
      name: 'Florida Southern College（赖特校园）',
      icon: '🏛',
      day: 'D2 · 11/14（方案 B）',
      hours: '游客中心 9:30–16:30（每天）',
      booking: '导览每天 10:00 与 14:00（Basic，90 分钟，$45/人），强烈建议提前 24 小时在网上预约；另有 13:00 的 In-Depth（2.5 小时，$70）',
      plan: [
        '13:35 到游客中心报到，14:00 跟 Basic Walking Tour 走',
        '导览覆盖 Annie Pfeiffer Chapel、Water Dome、Esplanades 连廊',
        '15:30 结束后自己再拍 Water Dome，16:30 前离开'
      ],
      note: '全美最大规模的单一校区赖特建筑群，13 栋。不进导览的话很多室内看不到。'
    },
    {
      ord: 'D3-01',
      photos: [
        { t: 'img/sights/bluespring-1-t.jpg', m: 'img/sights/bluespring-1-m.jpg', f: 'img/sights/bluespring-1.jpg' },
        { t: 'img/sights/bluespring-2-t.jpg', m: 'img/sights/bluespring-2-m.jpg', f: 'img/sights/bluespring-2.jpg' },
        { t: 'img/sights/bluespring-3-t.jpg', m: 'img/sights/bluespring-3-m.jpg', f: 'img/sights/bluespring-3.jpg' }
      ],
      ticketId: 'blue',
      name: 'Blue Spring State Park',
      icon: '🐋',
      day: 'D3 · 11/15',
      hours: '8:00 开门，至日落',
      booking: '皮划艇导览建议提前订（2–3 小时含装备），海牛季会限流',
      plan: [
        '8:00 进园，先到码头领装备、听安全讲解',
        '8:30–11:30 下水，沿圣约翰河划，看海牛上浮换气',
        '11:30 上岸换衣服，园内走木栈道看泉眼（禁止下水）'
      ],
      note: '11/15 起是海牛季：泉眼水道禁船，但河段照样能看到。清晨水温高、海牛最活跃。'
    },
    {
      ord: 'D4-01',
      photos: [
        { t: 'img/sights/animal-1-t.jpg', m: 'img/sights/animal-1-m.jpg', f: 'img/sights/animal-1.jpg' },
        { t: 'img/sights/animal-2-t.jpg', m: 'img/sights/animal-2-m.jpg', f: 'img/sights/animal-2.jpg' },
        { t: 'img/sights/animal-3-t.jpg', m: 'img/sights/animal-3-m.jpg', f: 'img/sights/animal-3.jpg' }
      ],
      ticketId: 'ak',
      name: '迪士尼 Animal Kingdom',
      icon: '🦁',
      day: 'D4 · 11/16',
      hours: '约 8:00–19:00（每天不同，以官方 App 为准）',
      booking: '提前买指定日期门票并绑定 App；热门项目建议买 Lightning Lane',
      plan: [
        '8:20 到闸口，安检后直奔 Pandora',
        '9:00 Flight of Passage（全天最长队），10:30 Safaris',
        '12:40 午餐，14:00 Everest，15:10 狮子王演出',
        '16:30  Jungle Trek，18:00 晚餐，闭园前看 Tree of Life 灯光'
      ],
      note: '园区很大，穿好走的鞋；水杯可以带，园内有直饮水。'
    },
    {
      ord: 'D5-01',
      photos: [
        { t: 'img/sights/ksc-1-t.jpg', m: 'img/sights/ksc-1-m.jpg', f: 'img/sights/ksc-1.jpg' },
        { t: 'img/sights/ksc-2-t.jpg', m: 'img/sights/ksc-2-m.jpg', f: 'img/sights/ksc-2.jpg' },
        { t: 'img/sights/ksc-3-t.jpg', m: 'img/sights/ksc-3-m.jpg', f: 'img/sights/ksc-3.jpg' }
      ],
      ticketId: 'ksc',
      name: '肯尼迪航天中心',
      icon: '🚀',
      day: 'D5 · 11/17',
      hours: '9:00–17:00',
      booking: '一定要提前在网上买票，现场买要排半小时',
      plan: [
        '09:00 开门就进，先看 Heroes & Legends（室内，趁凉快）',
        '10:00 火箭花园拍照 20 分钟',
        '10:25 上巴士去土星五号中心（车程 30 分钟，最费时的一段）',
        '10:55–12:45 土星五号中心，馆内 Moon Rock Cafe 吃午饭',
        '13:30 巴士回主园区，14:00 Atlantis 展馆 + 模拟发射 90 分钟',
        '15:30 Gateway 深空展 45 分钟，16:15 IMAX（看场次）',
        '16:55 商店，17:00 闭园'
      ],
      note: '唯一需要守时的是巴士导览（首班车约 10:00）和 IMAX 场次，进门先看当天时刻牌。玩到 17:00 闭园时间刚好够，不用赶。'
    },
    {
      ord: 'D8-01',
      photos: [
        { t: 'img/sights/bonnet-1-t.jpg', m: 'img/sights/bonnet-1-m.jpg', f: 'img/sights/bonnet-1.jpg' },
        { t: 'img/sights/bonnet-2-t.jpg', m: 'img/sights/bonnet-2-m.jpg', f: 'img/sights/bonnet-2.jpg' },
        { t: 'img/sights/bonnet-3-t.jpg', m: 'img/sights/bonnet-3-m.jpg', f: 'img/sights/bonnet-3.jpg' }
      ],
      ticketId: 'bonnet',
      name: 'Bonnet House Museum & Gardens',
      icon: '🏡',
      day: 'D8 · 11/20',
      hours: '周二–周日 11:00–16:00（16:00 最后入场，园区 17:00 关）；周一闭馆',
      booking: '自助参观不用预约，成人 $30；只逛花园 $15',
      plan: ['14:00 到，先看 15 分钟短片', '主楼自助参观 40 分钟', '花园和池塘 30 分钟'],
      note: '1920 年建的庄园，家具和画作都保留原样。就在海滩边上，逛完可以顺路去 A1A。'
    },
    {
      ord: 'D7-01',
      photos: [
        { t: 'img/sights/nsu-1-t.jpg', m: 'img/sights/nsu-1-m.jpg', f: 'img/sights/nsu-1.jpg' },
        { t: 'img/sights/nsu-2-t.jpg', m: 'img/sights/nsu-2-m.jpg', f: 'img/sights/nsu-2.jpg' },
        { t: 'img/sights/nsu-3-t.jpg', m: 'img/sights/nsu-3-m.jpg', f: 'img/sights/nsu-3.jpg' }
      ],
      ticketId: 'nsu',
      name: 'NSU Art Museum',
      icon: '🖼',
      day: 'D7 · 11/19',
      hours: '周三–周日开放，周四延时至 20:00（以官网为准）',
      plan: ['1 小时看常设的拉丁美洲和当代收藏', '周四晚上人少，适合下班后去'],
      note: '离 Riverwalk 步行 3 分钟，两个点连着走。'
    },
    {
      ord: 'D9-03',
      photos: [
        { t: 'img/sights/vizcaya-1-t.jpg', m: 'img/sights/vizcaya-1-m.jpg', f: 'img/sights/vizcaya-1.jpg' },
        { t: 'img/sights/vizcaya-2-t.jpg', m: 'img/sights/vizcaya-2-m.jpg', f: 'img/sights/vizcaya-2.jpg' },
        { t: 'img/sights/vizcaya-3-t.jpg', m: 'img/sights/vizcaya-3-m.jpg', f: 'img/sights/vizcaya-3.jpg' }
      ],
      ticketId: 'vizcaya',
      name: 'Vizcaya Museum & Gardens',
      icon: '🏰',
      day: 'D9 · 11/21（方案 B）',
      hours: '9:30–16:30，周二闭馆',
      booking: '必须提前网上订票，现场常售完；成人约 $25',
      plan: ['9:50 到，先看主楼 16 个房间（1 小时）', '花园和石船 40 分钟', '海边平台拍照 15 分钟'],
      note: '1916 年意大利文艺复兴式庄园。周六上午团队多，早到 30 分钟更从容。'
    }
    ,
    {
      icon: '🧺',
      ord: 'D2-01',
      photos: [
        { t: 'img/sights/market-1-t.jpg', m: 'img/sights/market-1-m.jpg', f: 'img/sights/market-1.jpg' },
        { t: 'img/sights/market-2-t.jpg', m: 'img/sights/market-2-m.jpg', f: 'img/sights/market-2.jpg' },
        { t: 'img/sights/market-3-t.jpg', m: 'img/sights/market-3-m.jpg', f: 'img/sights/market-3.jpg' }
      ],
      name: 'Winter Park Farmers\' Market',
      day: 'D2 · 11/14（周六限定）',
      hours: '每周六 8:00–13:00',
      booking: '不用预约，带现金更好砍价',
      plan: [
        '从 200 W New England Ave 的旧火车站进去，先绕一圈看有什么',
        '早餐摊（可颂、biscuit、咖啡）排队最快的是本地面包房',
        '买点柑橘和蜂蜜带走，佛罗里达的橘子 11 月正当季'
      ],
      note: '室内仓库式市集，下雨也开。只有周六上午有——排错一天就白跑。'
    },
    {
      icon: '🪟',
      ord: 'D2-03',
      photos: [
        { t: 'img/sights/morse-1-t.jpg', m: 'img/sights/morse-1-m.jpg', f: 'img/sights/morse-1.jpg' },
        { t: 'img/sights/morse-2-t.jpg', m: 'img/sights/morse-2-m.jpg', f: 'img/sights/morse-2.jpg' },
        { t: 'img/sights/morse-3-t.jpg', m: 'img/sights/morse-3-m.jpg', f: 'img/sights/morse-3.jpg' }
      ],
      ticketId: 'morse',
      name: 'Morse Museum of American Art',
      day: 'D2 · 11/14',
      hours: '周二–周六 9:30–16:00；周日 13:00–16:00；周一闭馆',
      booking: '门票几美元，周五傍晚常有免费时段（以官网为准）',
      plan: [
        '先看 Tiffany 礼拜堂——整间搬进来的，最震撼',
        '灯饰厅（Dragonfly、Wisteria 那些）30 分钟',
        '绘画与装饰艺术 20 分钟'
      ],
      note: '445 N Park Ave。馆不大但密度极高，1 小时刚好。这是全美最重要的 Tiffany 收藏。'
    },
    {
      icon: '⛵',
      ord: 'D2-05',
      photos: [
        { t: 'img/sights/boat-1-t.jpg', m: 'img/sights/boat-1-m.jpg', f: 'img/sights/boat-1.jpg' },
        { t: 'img/sights/boat-2-t.jpg', m: 'img/sights/boat-2-m.jpg', f: 'img/sights/boat-2.jpg' },
        { t: 'img/sights/boat-3-t.jpg', m: 'img/sights/boat-3-m.jpg', f: 'img/sights/boat-3.jpg' }
      ],
      ticketId: 'boattour',
      name: 'Winter Park Scenic Boat Tour',
      day: 'D2 · 11/14',
      hours: '10:00–16:00 整点发船（天气不好会停）',
      booking: '现场买票，$20 上下，旺季提前 15 分钟排队',
      plan: ['提前 15 分钟到 312 E Morse Blvd 的码头', '一小时穿过三条运河', '听船老大讲湖边豪宅的八卦']
    },
    {
      icon: '🏡',
      ord: 'D2-06',
      photos: [
        { t: 'img/sights/casa-1-t.jpg', m: 'img/sights/casa-1-m.jpg', f: 'img/sights/casa-1.jpg' },
        { t: 'img/sights/casa-2-t.jpg', m: 'img/sights/casa-2-m.jpg', f: 'img/sights/casa-2.jpg' },
        { t: 'img/sights/casa-3-t.jpg', m: 'img/sights/casa-3-m.jpg', f: 'img/sights/casa-3.jpg' }
      ],
      name: 'Casa Feliz Historic Home',
      day: 'D2 · 11/14（和 Kraft Azalea 二选一）',
      hours: '开放时段有限，去之前查官网',
      plan: ['656 N Park Ave', '1933 年的西班牙农庄式宅子', '院子比室内更好看'],
      note: '免费参观，但常常只开上午或只开周末，别扑空。'
    },
    {
      icon: '🌳',
      ord: 'D2-07',
      photos: [
        { t: 'img/sights/kraft-1-t.jpg', m: 'img/sights/kraft-1-m.jpg', f: 'img/sights/kraft-1.jpg' },
        { t: 'img/sights/kraft-2-t.jpg', m: 'img/sights/kraft-2-m.jpg', f: 'img/sights/kraft-2.jpg' },
        { t: 'img/sights/kraft-3-t.jpg', m: 'img/sights/kraft-3-m.jpg', f: 'img/sights/kraft-3.jpg' }
      ],
      name: 'Kraft Azalea Garden',
      day: 'D2 · 11/14（和 Casa Feliz 二选一）',
      hours: '日出到日落，免费',
      plan: ['1365 Alabama Dr', '湖边小花园，一圈 10 分钟', '傍晚光线最好，适合坐着发呆']
    },
    {
      icon: '🪑',
      ord: 'D3-02',
      photos: [
        { t: 'img/sights/renningers-1-t.jpg', m: 'img/sights/renningers-1-m.jpg', f: 'img/sights/renningers-1.jpg' },
        { t: 'img/sights/renningers-2-t.jpg', m: 'img/sights/renningers-2-m.jpg', f: 'img/sights/renningers-2.jpg' },
        { t: 'img/sights/renningers-3-t.jpg', m: 'img/sights/renningers-3-m.jpg', f: 'img/sights/renningers-3.jpg' }
      ],
      name: 'Renninger\'s Mt. Dora 跳蚤市场 + 古董中心',
      day: 'D3 · 11/15（周日）',
      hours: '周末开放，跳蚤市场上午人多；具体时段以官网为准',
      booking: '免费进场，带现金',
      plan: [
        '先逛古董中心三层楼（有电梯）',
        '再去户外跳蚤摊位，越往里越便宜',
        '大件别买——你还要飞回上海'
      ],
      note: '20651 US-441, Mount Dora。从 Blue Spring 开车 40 分钟。'
    },
    {
      icon: '🏘',
      ord: 'D3-03',
      photos: [
        { t: 'img/sights/dora-1-t.jpg', m: 'img/sights/dora-1-m.jpg', f: 'img/sights/dora-1.jpg' },
        { t: 'img/sights/dora-2-t.jpg', m: 'img/sights/dora-2-m.jpg', f: 'img/sights/dora-2.jpg' },
        { t: 'img/sights/dora-3-t.jpg', m: 'img/sights/dora-3-m.jpg', f: 'img/sights/dora-3.jpg' }
      ],
      name: 'Mount Dora 老城',
      day: 'D3 · 11/15',
      hours: '店铺大多 10:00–17:00，周日部分不开',
      plan: ['Donnelly St 主街逛古董店和书店', '走到湖滨看 Mount Dora 灯塔（1 Lighthouse Cir）', '找家咖啡馆坐一会儿'],
      note: '佛州小山城，节奏很慢。周日下午人不多，适合收尾。'
    },
    {
      icon: '🏛',
      ord: 'D2-09',
      ticketId: 'hc',
      name: 'Orange County Regional History Center',
      day: 'D2 · 11/14（市区线顺路）',
      hours: '约 10:00–17:00，周日 12:00 开（以官网为准）',
      plan: ['65 E Central Blvd，就在图书馆旁边', '老法院改造的四层展馆', '佛州历史 + 迪士尼之前的奥兰多'],
      note: '如果只想看建筑，大厅免费区就够；展区要门票。'
    },
    {
      icon: '🚉',
      ord: 'D2-11',
      photos: [
        { t: 'img/sights/church-1-t.jpg', m: 'img/sights/church-1-m.jpg', f: 'img/sights/church-1.jpg' },
        { t: 'img/sights/church-2-t.jpg', m: 'img/sights/church-2-m.jpg', f: 'img/sights/church-2.jpg' },
        { t: 'img/sights/church-3-t.jpg', m: 'img/sights/church-3-m.jpg', f: 'img/sights/church-3.jpg' }
      ],
      name: 'Church Street Station',
      day: 'D2 · 11/14',
      hours: '街区全天，店铺和酒吧傍晚才热闹',
      plan: ['129 W Church St', '1889 年老火车站的红砖站房', '天黑后酒吧和 live music 开场']
    },
    {
      icon: '🐕',
      ord: 'D3-04',
      photos: [
        { t: 'img/sights/dogpark-1-t.jpg', m: 'img/sights/dogpark-1-m.jpg', f: 'img/sights/dogpark-1.jpg' },
        { t: 'img/sights/dogpark-2-t.jpg', m: 'img/sights/dogpark-2-m.jpg', f: 'img/sights/dogpark-2.jpg' },
        { t: 'img/sights/dogpark-3-t.jpg', m: 'img/sights/dogpark-3-m.jpg', f: 'img/sights/dogpark-3.jpg' }
      ],
      name: 'Lake Baldwin 狗公园',
      day: 'D3 · 11/15（可选）',
      hours: '日出到日落，免费',
      plan: ['2070 Lake Baldwin Ln', '湖滨大草坪，无绳区', '周末下午常有狗主人聚会'],
      note: '没狗也能在旁边步道走，看热闹。不感兴趣就跳过。'
    }

    ,
    {
      icon: '🛍',
      ord: 'D2-04',
      photos: [
        { t: 'img/sights/park-1-t.jpg', m: 'img/sights/park-1-m.jpg', f: 'img/sights/park-1.jpg' },
        { t: 'img/sights/park-2-t.jpg', m: 'img/sights/park-2-m.jpg', f: 'img/sights/park-2.jpg' },
        { t: 'img/sights/park-3-t.jpg', m: 'img/sights/park-3-m.jpg', f: 'img/sights/park-3.jpg' }
      ],
      name: 'Park Avenue',
      day: 'D2 · 11/14',
      hours: '店铺大多 10:00–18:00，周日部分休息',
      plan: [
        '从 Morse Blvd 往南走，书店、买手店、咖啡馆一路排开',
        '路边有长椅和喷泉，累了坐会儿',
        '南段必去：Rifle Paper Co 创始店（插画文具，全球旗舰）'
      ],
      note: 'Winter Park 的主街。11 月中已经换上圣诞橱窗。周六上午人多，慢慢走、看到喜欢的就进，别当成赶点。'
    },
    {
      ord: 'D2-04b',
      icon: '✉️',
      photos: [
        { t: 'img/sights/rifle-1-t.jpg', m: 'img/sights/rifle-1-m.jpg', f: 'img/sights/rifle-1.jpg' },
        { t: 'img/sights/rifle-2-t.jpg', m: 'img/sights/rifle-2-m.jpg', f: 'img/sights/rifle-2.jpg' },
        { t: 'img/sights/rifle-3-t.jpg', m: 'img/sights/rifle-3-m.jpg', f: 'img/sights/rifle-3.jpg' }
      ],
      name: 'Rifle Paper Co 创始店',
      day: 'D2 · 11/14',
      hours: '约 10:00–18:00，周日开门较晚（以官网为准）',
      plan: [
        '位置在 Park Ave 南段，Morse Blvd 往南两个路口',
        '纸品、笔记本、日历、手机壳、丝巾，插画都是自家画的',
        '明信片和贺卡最适合带回国送人，不占行李'
      ],
      note: '这个插画文具品牌 2009 年创立在 Winter Park，这家是创始店兼全球旗舰，别处买不到同款。价格不便宜（笔记本 $20 起），但设计确实好看。⚠️ 具体门牌号以地图为准，直接搜 "Rifle Paper Co Winter Park"。'
    },
    {
      icon: '🌊',
      ord: 'D7-02',
      photos: [
        { t: 'img/sights/riverwalk-1-t.jpg', m: 'img/sights/riverwalk-1-m.jpg', f: 'img/sights/riverwalk-1.jpg' },
        { t: 'img/sights/riverwalk-2-t.jpg', m: 'img/sights/riverwalk-2-m.jpg', f: 'img/sights/riverwalk-2.jpg' }
      ],
      name: 'Fort Lauderdale Riverwalk',
      day: 'D7 · 11/19',
      hours: '全天开放，免费',
      plan: ['沿 New River 从 Broward Center 走到 Riverwalk 公园', '一路有雕塑、码头和露天剧场', '傍晚看游艇亮灯'],
      note: 'NSU 美术馆就在河边，看完出来走 20 分钟正好。'
    },
    {
      icon: '🏖',
      ord: 'D9-01',
      photos: [
        { t: 'img/sights/beach-1-t.jpg', m: 'img/sights/beach-1-m.jpg', f: 'img/sights/beach-1.jpg' },
        { t: 'img/sights/beach-2-t.jpg', m: 'img/sights/beach-2-m.jpg', f: 'img/sights/beach-2.jpg' },
        { t: 'img/sights/beach-3-t.jpg', m: 'img/sights/beach-3-m.jpg', f: 'img/sights/beach-3.jpg' }
      ],
      name: 'Fort Lauderdale Beach（含 Las Olas）',
      day: 'D9 · 11/21（方案 A）',
      hours: '全天；救生员值守约 9:00–17:00',
      plan: ['A1A 沿海大道旁的沙滩', 'Las Olas Blvd 东端就是海滩入口', '往北走人少，往南走商铺多'],
      note: '11 月水温约 25°C，能下水。沙滩椅和伞可现场租。'
    },
    {
      icon: '🚤',
      ord: 'D9-02',
      photos: [
        { t: 'img/sights/watertaxi-1-t.jpg', m: 'img/sights/watertaxi-1-m.jpg', f: 'img/sights/watertaxi-1.jpg' },
        { t: 'img/sights/watertaxi-2-t.jpg', m: 'img/sights/watertaxi-2-m.jpg', f: 'img/sights/watertaxi-2.jpg' },
        { t: 'img/sights/watertaxi-3-t.jpg', m: 'img/sights/watertaxi-3-m.jpg', f: 'img/sights/watertaxi-3.jpg' }
      ],
      ticketId: 'watertaxi',
      name: 'Water Taxi（运河水上巴士）',
      day: 'D9 · 11/21（方案 A）',
      hours: '约 10:00–22:00，30–45 分钟一班',
      booking: '一日票约 $35，可随时上下船',
      plan: ['在 Las Olas 或 17th St 码头登船', '沿 New River 看豪宅和游艇', '可在 Beach 或 Downtown 下船继续逛'],
      note: '当交通工具用也行，比固定观光船自由。'
    },
    {
      icon: '🎨',
      ord: 'D9-04',
      photos: [
        { t: 'img/sights/wynwood-1-t.jpg', m: 'img/sights/wynwood-1-m.jpg', f: 'img/sights/wynwood-1.jpg' },
        { t: 'img/sights/wynwood-2-t.jpg', m: 'img/sights/wynwood-2-m.jpg', f: 'img/sights/wynwood-2.jpg' },
        { t: 'img/sights/wynwood-3-t.jpg', m: 'img/sights/wynwood-3-m.jpg', f: 'img/sights/wynwood-3.jpg' }
      ],
      ticketId: 'wynwood',
      name: 'Wynwood Walls',
      day: 'D9 · 11/21（方案 B）',
      hours: '约 10:30–18:00（周一常闭）',
      booking: '门票约 $15，现场买',
      plan: ['先看 Walls 主区，40 多幅大型壁画', '外围街区的免费涂鸦也值得走一圈', 'Zak the Baker 和 Coyo Taco 都在步行范围'],
      note: '迈阿密最出片的地方。上午光线好、人也少。'
    },
    {
      icon: '🌴',
      ord: 'D9-05',
      photos: [
        { t: 'img/sights/ocean-1-t.jpg', m: 'img/sights/ocean-1-m.jpg', f: 'img/sights/ocean-1.jpg' },
        { t: 'img/sights/ocean-2-t.jpg', m: 'img/sights/ocean-2-m.jpg', f: 'img/sights/ocean-2.jpg' },
        { t: 'img/sights/southbeach-1-t.jpg', m: 'img/sights/southbeach-1-m.jpg', f: 'img/sights/southbeach-1.jpg' },
        { t: 'img/sights/southbeach-2-t.jpg', m: 'img/sights/southbeach-2-m.jpg', f: 'img/sights/southbeach-2.jpg' },
        { t: 'img/sights/southbeach-3-t.jpg', m: 'img/sights/southbeach-3-m.jpg', f: 'img/sights/southbeach-3.jpg' }
      ],
      name: 'South Beach / Ocean Drive',
      day: 'D9 · 11/21（方案 B）',
      hours: '全天',
      plan: ['Ocean Drive 的 Art Deco 建筑群', 'Lummus Park 海滩', '走到南端 South Pointe 看码头'],
      note: '晚上酒吧街很吵；Joe’s Stone Crab 就在南边不远。'
    },
    {
      icon: '🛶',
      ord: 'D3-01b',
      ticketId: 'kings',
      name: 'Kings Landing（备选）',
      day: 'D3 · 11/15（替代 Blue Spring）',
      hours: '约 8:00–16:00，按时段放船',
      booking: '只能提前官网预约，不接受现场；旺季两周前就满',
      plan: [
        '从 Kings Landing 码头上船，顺 Rock Springs Run 往下漂',
        '水清见底，两边是原始柏树林，比 Blue Spring 更野',
        '划到 Wekiva River 交汇处折返，全程 2.5–4 小时'
      ],
      note: '在 Apopka 的 Kelly Park 北侧（Rock Springs Run 上游）。和 Blue Spring 二选一：Kings Landing 水质更清、人更少，但没有海牛；Blue Spring 海牛季能看海牛，人稍多。⚠️ 具体门牌和放船时段以官网为准。'
    },
  ]
};
