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

  /* ------------------------------- 酒店 -------------------------------- */
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
      name: 'Orlando Public Library',
      icon: '📚',
      day: 'D2 · 11/14',
      hours: '约 10:00–18:00（各日不同，以官网为准）',
      plan: ['1 楼主厅的玻璃中庭抬头看', '2–3 楼有本地历史和艺术类藏书', '门口广场有水景，是市区打卡点'],
      note: '离 Lake Eola 步行 8 分钟，两个点连着逛。'
    },
    {
      name: 'Lake Eola Park',
      icon: '🦢',
      day: 'D2 · 11/14',
      hours: '公园全天；天鹅船约 10:00–19:00',
      plan: ['环湖步道一圈 1.2 公里，25 分钟慢走', '天鹅船 30 分钟约 $15/船', '傍晚喷泉配市中心天际线是拍照点'],
      note: '周日下午有露天市集，人多但热闹。'
    },
    {
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
      name: '肯尼迪航天中心',
      icon: '🚀',
      day: 'D5 · 11/17',
      hours: '9:00–17:00',
      booking: '一定要提前在网上买票，现场买要排半小时',
      plan: [
        '09:05 进门直奔巴士导览乘车点（第一班人最少）',
        '09:15–11:20 巴士 + 土星五号中心',
        '11:25–12:25 Atlantis 展馆，12:30 午餐',
        '13:12–14:27 Gateway，14:30–15:10 Heroes & Legends',
        '15:12 火箭花园 + 商店，15:30 出园'
      ],
      note: '唯一需要守时的是巴士导览；Astronaut Encounter / IMAX 每天场次不同，进门先看时刻牌。'
    },
    {
      name: 'Bonnet House Museum & Gardens',
      icon: '🏡',
      day: 'D8 · 11/20',
      hours: '周二–周日 11:00–16:00（16:00 最后入场，园区 17:00 关）；周一闭馆',
      booking: '自助参观不用预约，成人 $30；只逛花园 $15',
      plan: ['14:00 到，先看 15 分钟短片', '主楼自助参观 40 分钟', '花园和池塘 30 分钟'],
      note: '1920 年建的庄园，家具和画作都保留原样。就在海滩边上，逛完可以顺路去 A1A。'
    },
    {
      name: 'NSU Art Museum',
      icon: '🖼',
      day: 'D7 · 11/19',
      hours: '周三–周日开放，周四延时至 20:00（以官网为准）',
      plan: ['1 小时看常设的拉丁美洲和当代收藏', '周四晚上人少，适合下班后去'],
      note: '离 Riverwalk 步行 3 分钟，两个点连着走。'
    },
    {
      name: 'Vizcaya Museum & Gardens',
      icon: '🏰',
      day: 'D9 · 11/21（方案 B）',
      hours: '9:30–16:30，周二闭馆',
      booking: '必须提前网上订票，现场常售完；成人约 $25',
      plan: ['9:50 到，先看主楼 16 个房间（1 小时）', '花园和石船 40 分钟', '海边平台拍照 15 分钟'],
      note: '1916 年意大利文艺复兴式庄园。周六上午团队多，早到 30 分钟更从容。'
    }
  ]
};
