/* =========================================================================
 * 行程数据 —— 只改这个文件就能改行程
 * -------------------------------------------------------------------------
 * 这次是真实行程：2026-11-13 上海出发 → 奥兰多 → 劳德代尔堡（WAF 2026）→ 11-22 回上海
 *
 * 字段说明：
 *   title     行程标题
 *   subtitle  一句话说明
 *   timezone  时区（美国东部 = "America/New_York"），日出日落/月相按这个算
 *   people    人数
 *   mapHome   地图默认视野 { lat, lng, zoom }
 *   days[]    每天一项：
 *     date   "YYYY-MM-DD"
 *     title  当天主题
 *     area   当天活动区域（显示在右上角）
 *     base   算日出日落用的坐标（填当天住宿点或活动中心）
 *     note   当天备注
 *     items[] 当天点位：
 *       time    到达时间 "HH:mm"（当地时间）
 *       name    地点名
 *       type    transport 交通 / sight 景点 / food 吃 / stay 住宿 / shop 购物 / other 其他
 *       lat,lng 纬度、经度（北纬西经为负）
 *       stay    停留分钟数
 *       transit 从上一站怎么过来
 *       note    备注
 *
 * 标注「待核对」的地方是按公开信息推的，出票后请核对实际时刻。
 * ========================================================================= */

window.TRIP = {
  title: '佛罗里达 · WAF 2026',
  subtitle: '上海 → 奥兰多 → 劳德代尔堡，会期 11/18–11/20',
  timezone: 'America/New_York',
  people: 2,
  mapHome: { lat: 27.9, lng: -81.2, zoom: 7 },
  days: [
    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-13',
      title: '上海 → 底特律 → 劳德代尔堡',
      area: '长途飞行',
      summary: '10:00 起飞，18:40 落地；当晚「直接开去奥兰多」还是「住机场」，两条路都写在下面',
      tag: '航班',
      base: { lat: 28.5383, lng: -81.3792 },
      note: '落地 18:40 已是疲劳极限，两条路：A 硬开 3 小时今晚到奥兰多（23:00 入住，第二天能睡到自然醒）；B 今晚就住机场附近，明早 9 点出发。B 更稳，代价是第二天上午变成车程。',
      items: [
        {
          time: '待办', name: '订奥兰多酒店（11/14–11/17）', type: 'other',
          note: '⚠️ 还没订，尽快订。走 A 方案就从 11/13 开始订，走 B 方案从 11/14 开始。选市中心或 Winter Park 附近，前两天活动都在这两处；自驾要带停车位。订好把右边这个勾打上。'
        },
        {
          time: '07:30', name: '上海浦东 T1 · 达美柜台', type: 'transport',
          lat: 31.1443, lng: 121.8083, stay: 150, transit: '打车或地铁 2 号线到浦东',
          note: '国际航班建议提前 3 小时。值机时确认行李直挂到 FLL，问清底特律要不要重新托运。'
        },
        {
          time: '10:00', name: 'PVG → 底特律 DTW（DL280）', type: 'transport',
          lat: 42.2124, lng: -83.3534, stay: 810, transit: '直飞约 13.5 小时',
          note: '当地时间同日 11:31 落地。机上有两顿正餐，落地前把外套拿出来。'
        },
        {
          time: '11:31', name: '底特律中转 4 小时', type: 'transport',
          lat: 42.2124, lng: -83.3534, stay: 240, transit: 'McNamara 航站楼',
          note: '入境、取行李、海关、重新托运再安检，正常 1 小时内能办完，剩下时间在航站楼吃饭。'
        },
        {
          time: '15:35', name: 'DTW → 劳德代尔堡 FLL', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 170, transit: '约 2 小时 50 分',
          note: '时刻待核对（按 4 小时中转推算）。'
        },
        {
          time: '18:40', name: 'FLL 取租车', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 45, transit: '到达层跟随 Rental Car 指示牌',
          note: '建议就在机场租车：奥兰多、肯尼迪航天中心、回劳德代尔堡都用得上。'
        },
        {
          time: '', name: '方案 A · 当晚直接开到奥兰多（23:00 入住）', type: 'divider',
          note: ''
        },
        {
          time: '19:30', name: '开车去奥兰多', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 200, transit: 'I-95 北上转 Florida Turnpike，约 3 小时',
          note: '两个人换着开更安全。夜路车少，但服务区也少，出发前加满油。'
        },
        {
          time: '23:00', name: '奥兰多酒店 check-in', type: 'stay',
          lat: 28.5383, lng: -81.3792, stay: 30, transit: '自驾',
          note: '到了直接睡。选市中心或 Winter Park 附近。'
        },
        {
          time: '', name: '方案 B · 今晚住机场附近，明早再北上（更稳）', type: 'divider',
          note: ''
        },
        {
          time: '20:00', name: '机场附近酒店 check-in', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 40, transit: '开车 10 分钟',
          note: '可以直接订 17th Street 那家 Holiday Inn Express（就是后面 WAF 住的那家，离机场 2 英里），熟门熟路。'
        },
        {
          time: '20:45', name: '17th Street 晚餐', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 80, transit: '步行 5 分钟',
          note: '运河边随便找一家，吃完就睡。'
        },
        {
          time: '22:00', name: '休息', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '步行',
          note: '明早 9:00 出发，还有时间吃个正经早餐。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-14',
      title: 'Winter Park · 奥兰多市区（上午/下午各二选一）',
      area: 'Winter Park / 市区',
      summary: 'Winter Park 校园 + 奥兰多市区；下午可选赖特校园或市区线',
      tag: '城市',
      base: { lat: 28.5423, lng: -81.3785 },
      note: '上午看昨晚走的是哪条：已在奥兰多就去 Winter Park；昨晚住机场的话上午是车程，Winter Park 这半天就没了。下午在「市区线」和「赖特线」里挑一条。',
      items: [
        {
          time: '', name: '上午 · 已在奥兰多（昨晚走 D1 方案 A）', type: 'divider',
          note: ''
        },
        {
          time: '09:00', name: '出发去 Winter Park', type: 'transport',
          lat: 28.5916, lng: -81.3485, stay: 25, transit: '打车 20 分钟',
          note: ''
        },
        {
          time: '09:30', name: 'Rollins College', type: 'sight',
          lat: 28.5916, lng: -81.3485, stay: 90, transit: '步行进校区',
          note: '湖边校园，红砖 + 西班牙风。Cornell Fine Arts Museum 免费，周四到周日开。'
        },
        {
          time: '11:10', name: 'Park Avenue', type: 'shop',
          lat: 28.5966, lng: -81.3512, stay: 50, transit: '步行 5 分钟',
          note: '梧桐树主街，书店和咖啡馆，11 月已经有圣诞装饰。'
        },
        {
          time: '12:10', name: 'Park Ave 午餐', type: 'food',
          lat: 28.5952, lng: -81.3508, stay: 70, transit: '步行 3 分钟',
          note: 'The Ravenous Pig 或 Prato，周末要等位。'
        },
        {
          time: '', name: '上午 · 昨晚住机场（D1 方案 B）', type: 'divider',
          note: ''
        },
        {
          time: '09:00', name: '出发北上奥兰多', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 195, transit: 'I-95 转 Turnpike，约 3 小时',
          note: '睡到 7:30 再走，酒店吃完早餐出发。中途在服务区停一次。'
        },
        {
          time: '12:15', name: '到奥兰多，午餐', type: 'food',
          lat: 28.5383, lng: -81.3792, stay: 60, transit: '直接开到市区',
          note: '吃完刚好接下午的线。Winter Park 那半天只能放弃，下次再来。'
        },
        {
          time: '', name: '下午 · 市区线（图书馆 + Lake Eola）', type: 'divider',
          note: ''
        },
        {
          time: '13:40', name: '打车去市中心', type: 'transport',
          lat: 28.5423, lng: -81.3785, stay: 25, transit: '打车 20 分钟',
          note: '已经在市区的话这段可以省掉，直接走过去。'
        },
        {
          time: '14:10', name: '奥兰多公共图书馆', type: 'sight',
          lat: 28.5423, lng: -81.3785, stay: 45, transit: '步行 5 分钟',
          note: '1986 年扩建的玻璃中庭，光很好。顺便看看当地的展览。'
        },
        {
          time: '15:10', name: 'Lake Eola Park', type: 'sight',
          lat: 28.5433, lng: -81.3728, stay: 70, transit: '步行 8 分钟',
          note: '环湖 1 英里，天鹅船 30 分钟约 $15。傍晚喷泉配天际线最好看。'
        },
        {
          time: '16:40', name: 'Church Street 一带闲逛', type: 'shop',
          lat: 28.5403, lng: -81.3805, stay: 60, transit: '步行 10 分钟',
          note: '老火车站改造的街区，有几家不错的酒吧和唱片店。'
        },
        {
          time: '18:30', name: '市中心晚餐', type: 'food',
          lat: 28.5400, lng: -81.3760, stay: 90, transit: '步行',
          note: ''
        },
        {
          time: '', name: '下午 · 赖特线（Lakeland，单程 1 小时）', type: 'divider',
          note: ''
        },
        {
          time: '12:30', name: '出发去 Lakeland', type: 'transport',
          lat: 28.0306, lng: -81.9479, stay: 60, transit: '打车单程约 1 小时（I-4 向西）',
          note: '打车往返约 $130–160；回程容易叫不到车，提前和司机约好时间。13:35 到游客中心正好赶上 14:00 的导览。'
        },
        {
          time: '13:35', name: 'Florida Southern College', type: 'sight',
          lat: 28.0306, lng: -81.9479, stay: 130, transit: '步行到游客中心',
          note: '导览每天只有 10:00 和 14:00 两场（Basic，90 分钟，$45/人），提前 24 小时在网上订。全美最大规模的单一校区赖特建筑群，13 栋。'
        },
        {
          time: '15:45', name: '校园自由逛', type: 'sight',
          lat: 28.0330, lng: -81.9450, stay: 50, transit: '步行',
          note: '重点看 Annie Pfeiffer Chapel 和 Water Dome 喷泉。'
        },
        {
          time: '16:40', name: '回奥兰多', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 60, transit: '打车 1 小时',
          note: ''
        },
        {
          time: '17:50', name: '晚餐', type: 'food',
          lat: 28.5400, lng: -81.3760, stay: 90, transit: '步行',
          note: ''
        },
        {
          time: '20:30', name: '回酒店', type: 'stay',
          lat: 28.5383, lng: -81.3792, stay: 30, transit: '打车 15 分钟',
          note: '明天去迪士尼要早起。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-15',
      title: 'Blue Spring 划船看海牛',
      area: 'Orange City',
      summary: 'Blue Spring 皮划艇看海牛，海牛季第一天',
      tag: '自然',
      base: { lat: 28.9487, lng: -81.3396 },
      note: '11 月 15 日正好是海牛季第一天。泉眼水道当天起禁止船只进入，但皮划艇在圣约翰河段下水照样能看到海牛，而且人少。',
      items: [
        {
          time: '07:30', name: '出发', type: 'transport',
          lat: 28.9487, lng: -81.3396, stay: 50, transit: '自驾或打车约 45 分钟（I-4 转 17-92）',
          note: '越早越好：清晨海牛活动最活跃，人也最少。'
        },
        {
          time: '08:30', name: 'Blue Spring State Park 皮划艇', type: 'sight',
          lat: 28.9487, lng: -81.3396, stay: 180, transit: '园内码头',
          note: '建议订 2–3 小时的 guided kayak tour（含装备）。海牛季这里会限流，提前在网上订；带防蚊液和换洗衣服。'
        },
        {
          time: '12:00', name: 'Orange City 午餐', type: 'food',
          lat: 28.9520, lng: -81.2990, stay: 60, transit: '开车 10 分钟',
          note: ''
        },
        {
          time: '13:30', name: '回奥兰多', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 50, transit: '自驾约 45 分钟',
          note: ''
        },
        {
          time: '15:00', name: 'Leu Gardens（备选）', type: 'sight',
          lat: 28.5680, lng: -81.3610, stay: 75, transit: '自驾 15 分钟',
          note: '50 英亩植物园；不想逛花园可以改 Orlando Museum of Art 或 ICON Park。'
        },
        {
          time: '18:30', name: '晚餐', type: 'food',
          lat: 28.5400, lng: -81.3760, stay: 90, transit: '打车',
          note: '明天去迪士尼要早起，今晚别太晚。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-16',
      title: '迪士尼 Animal Kingdom',
      area: 'Disney World',
      summary: '迪士尼 Animal Kingdom 全天，走路最多的一天',
      tag: '玩',
      base: { lat: 28.3553, lng: -81.5901 },
      note: '这是全程走路最多的一天。提前买好指定日期的票并绑定 App，开门前 30 分钟到闸口。',
      items: [
        {
          time: '07:40', name: '出发', type: 'transport',
          lat: 28.3553, lng: -81.5901, stay: 30, transit: '自驾或打车约 25 分钟',
          note: '停车费 $30 左右；打车可以直接到闸口。'
        },
        {
          time: '08:20', name: 'Animal Kingdom 入园', type: 'sight',
          lat: 28.3553, lng: -81.5901, stay: 40, transit: '步行到闸口',
          note: '开园前 30 分钟到，安检+闸口要排队。'
        },
        {
          time: '09:00', name: 'Avatar Flight of Passage', type: 'sight',
          lat: 28.3562, lng: -81.5918, stay: 60, transit: '直奔 Pandora',
          note: '全天排队最长的项目，一开门就冲，或买 Lightning Lane。'
        },
        {
          time: '10:30', name: 'Kilimanjaro Safaris', type: 'sight',
          lat: 28.3585, lng: -81.5930, stay: 45, transit: '步行 10 分钟',
          note: '动物上午更活跃，这个顺序是有意的。'
        },
        {
          time: '11:30', name: 'Na\'vi River Journey', type: 'sight',
          lat: 28.3560, lng: -81.5915, stay: 40, transit: '回 Pandora',
          note: ''
        },
        {
          time: '12:40', name: '午餐', type: 'food',
          lat: 28.3578, lng: -81.5892, stay: 60, transit: '步行',
          note: 'Satu\'li Canteen（Pandora）或 Flame Tree Barbecue。'
        },
        {
          time: '14:00', name: 'Expedition Everest', type: 'sight',
          lat: 28.3580, lng: -81.5870, stay: 45, transit: '步行 8 分钟到亚洲区',
          note: '过山车，逆冲那一下最刺激。'
        },
        {
          time: '15:10', name: 'Festival of the Lion King', type: 'sight',
          lat: 28.3558, lng: -81.5862, stay: 40, transit: '步行 5 分钟',
          note: '演出 30 分钟，提前 15 分钟进场。'
        },
        {
          time: '16:30', name: 'Maharajah Jungle Trek', type: 'sight',
          lat: 28.3572, lng: -81.5882, stay: 60, transit: '步行',
          note: '看老虎和蝙蝠；不累的话可以再排一次 Safari。'
        },
        {
          time: '18:00', name: '晚餐 + 园内逛到闭园', type: 'food',
          lat: 28.3568, lng: -81.5895, stay: 90, transit: '步行',
          note: '园区一般 19:00 关，闭园后 Tree of Life 有灯光秀。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-17',
      title: '肯尼迪航天中心一日 → 劳德代尔堡',
      area: 'KSC → Fort Lauderdale',
      base: { lat: 26.1018, lng: -80.1252 },
      summary: '航天中心从开门待到闭园（9:00–17:00），晚上开到劳德代尔堡',
      tag: '重头戏',
      note: '既然只有一天，就把 8 小时用满：9:00 开门进、17:00 闭园走，官方推荐的项目全都能覆盖。代价是到酒店要 20:15 左右，晚饭会晚一点。',
      items: [
        {
          time: '07:45', name: '退房，出发去 KSC', type: 'transport',
          lat: 28.5231, lng: -80.6818, stay: 75, transit: '自驾约 1 小时（FL-417→FL-528 向东）',
          note: '行李放车上。门票提前网上买好，现场买票要排半小时。'
        },
        {
          time: '08:45', name: '停车 + 安检入园', type: 'transport',
          lat: 28.5231, lng: -80.6818, stay: 15, transit: '停车场',
          note: '9:00 开门。进门先在时刻牌上记下当天 Astronaut Encounter 和 IMAX 的场次——这两项是定时项目。'
        },
        {
          time: '09:05', name: '直奔巴士导览乘车点', type: 'transport',
          lat: 28.5215, lng: -80.6810, stay: 10, transit: '进门往右后方 Taylor Dunn 乘车区',
          note: '关键：第一班车人最少。晚一小时这里就要排 40 分钟以上。'
        },
        {
          time: '09:15', name: '巴士导览 + 土星五号中心', type: 'sight',
          lat: 28.6070, lng: -80.6040, stay: 125, transit: '园区巴士，单程约 40 分钟',
          note: '沿途经过发射台和总装大楼（VAB），到 Apollo/Saturn V 中心下车看 1 小时。返程车连续发，随时走。'
        },
        {
          time: '11:25', name: '航天飞机 Atlantis 展馆', type: 'sight',
          lat: 28.5218, lng: -80.6818, stay: 60, transit: '坐巴士回主园区，步行 5 分钟',
          note: '看到 Atlantis 实体是全程最震撼的时刻。含 Shuttle Launch Experience（模拟发射，身高 1.2 米以上）。'
        },
        {
          time: '12:30', name: '午餐', type: 'food',
          lat: 28.5220, lng: -80.6815, stay: 45, transit: 'Orbit Cafe / Red Rock Grill',
          note: '园区内餐饮一般，胜在省时间。'
        },
        {
          time: '13:20', name: 'Gateway: Deep Space Launch', type: 'sight',
          lat: 28.5222, lng: -80.6812, stay: 75, transit: '步行 3 分钟',
          note: '最新的沉浸式展馆，四个「太空港」体验，园里排队最长的项目。'
        },
        {
          time: '14:40', name: 'Heroes & Legends（航天员名人堂）', type: 'sight',
          lat: 28.5212, lng: -80.6822, stay: 45, transit: '步行 4 分钟',
          note: '从水星计划讲到航天飞机，有新人墙和真正的航天器。'
        },
        {
          time: '15:30', name: 'IMAX 电影', type: 'sight',
          lat: 28.5225, lng: -80.6815, stay: 45, transit: '步行 2 分钟',
          note: '场次每天不同，进门时看时刻牌挑一场。没赶上就换成 Rocket Garden 导览或再看一次 Atlantis。'
        },
        {
          time: '16:20', name: '火箭花园 + 商店', type: 'shop',
          lat: 28.5208, lng: -80.6825, stay: 40, transit: '步行 2 分钟',
          note: '火箭花园就在出口路上，顺路拍。商店买点 NASA 纪念品，17:00 闭园前出来。'
        },
        {
          time: '17:00', name: '闭园，南下劳德代尔堡', type: 'transport',
          lat: 26.1018, lng: -80.1252, stay: 195, transit: 'FL-528 转 I-95 南下，约 3 小时 15 分',
          note: '中途在 Fort Pierce 服务区吃个快餐。18:00 后进入 Broward 段会堵，多留半小时。'
        },
        {
          time: '20:20', name: '入住 Holiday Inn Express', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '1500 SE 17th St Causeway',
          note: '车停酒店，后面三天走路去会场。'
        },
        {
          time: '21:00', name: '17th Street 晚餐', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 75, transit: '步行 5 分钟',
          note: '比原计划晚一小时，找家开到 22:00 之后的，Boatyard 或 15th Street Fisheries。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-18',
      title: 'WAF Day 1 · 桐安里 + 南山里',
      area: 'Fort Lauderdale',
      summary: 'WAF Day 1：14:00 桐安里、17:00 南山里',
      tag: '汇报',
      base: { lat: 26.0996, lng: -80.1190 },
      note: '两场汇报相隔 3 小时，中间别跑远，在会场看别的 crit 正好。',
      items: [
        {
          time: '08:00', name: '早餐 + 海滩散步', type: 'sight',
          lat: 26.1198, lng: -80.1046, stay: 75, transit: '步行或 5 分钟车程到 A1A',
          note: '会场离海滩 1.5 英里。早上人少，风也小，回来正好换衣服。'
        },
        {
          time: '12:00', name: '到会场准备（桐安里）', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 120, transit: '步行 12 分钟',
          note: '提前 2 小时到：确认 crit room 编号、投影接口、讲稿备份 U 盘。'
        },
        {
          time: '14:00', name: '桐安里 汇报', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 30, transit: '会场内',
          note: '含问答约 30 分钟。讲完别急着走，评委的问题往往是评选关键。'
        },
        {
          time: '15:00', name: '旁听其他 crit / 看展', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 110, transit: '会场内',
          note: '16 个 crit room 同时进行，挑同类别（住宅/文化）的听。'
        },
        {
          time: '17:00', name: '南山里 汇报', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 30, transit: '会场内',
          note: ''
        },
        {
          time: '18:00', name: '会后交流', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 60, transit: '会场内 / Festival Hall',
          note: '展区有合作方的酒会，是认识评委和其他团队的时候。'
        },
        {
          time: '19:30', name: 'Las Olas 晚餐', type: 'food',
          lat: 26.1195, lng: -80.1345, stay: 90, transit: '打车 8 分钟',
          note: 'Las Olas 是主街，餐厅密度最高，走完 20 分钟。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-19',
      title: 'WAF Day 2 · 东石村养老 + 金光汇',
      area: 'Fort Lauderdale',
      summary: 'WAF Day 2：11:00 东石村养老、15:20 金光汇',
      tag: '汇报',
      base: { lat: 26.0996, lng: -80.1190 },
      note: '今天两场之间空 2 小时，可以在会场看展，别回酒店（来回 1 小时不值）。',
      items: [
        {
          time: '09:00', name: '到会场准备（东石村养老）', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 120, transit: '步行 12 分钟',
          note: '11:00 场，提前 2 小时到。'
        },
        {
          time: '11:00', name: '东石村养老 汇报', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 30, transit: '会场内',
          note: ''
        },
        {
          time: '12:00', name: '会场午餐', type: 'food',
          lat: 26.0996, lng: -80.1190, stay: 70, transit: '会场内',
          note: ''
        },
        {
          time: '13:20', name: '到会场准备（金光汇）', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 120, transit: '会场内',
          note: '15:20 场。这场结束就自由了。'
        },
        {
          time: '15:20', name: '金光汇 汇报', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 30, transit: '会场内',
          note: ''
        },
        {
          time: '16:30', name: 'NSU Art Museum', type: 'sight',
          lat: 26.1206, lng: -80.1421, stay: 80, transit: '打车 8 分钟',
          note: '周四开到晚上 8 点，正好赶得上。馆不大，1 小时够。'
        },
        {
          time: '18:00', name: 'Riverwalk 散步', type: 'sight',
          lat: 26.1180, lng: -80.1440, stay: 45, transit: '步行 3 分钟',
          note: '新河两岸，能看到游艇和桥，傍晚光线好。'
        },
        {
          time: '19:00', name: '晚餐', type: 'food',
          lat: 26.1195, lng: -80.1345, stay: 90, transit: '步行 10 分钟',
          note: ''
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-20',
      title: 'WAF Day 3 · 颁奖典礼',
      area: 'Fort Lauderdale',
      summary: 'WAF Day 3：19:00 Gala 颁奖典礼',
      tag: '汇报',
      base: { lat: 26.0996, lng: -80.1190 },
      note: '晚上是 Gala Dinner（19:00），白天不用早起，穿正装的那件记得熨。',
      items: [
        {
          time: '10:00', name: '旁听 crit', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 150, transit: '步行 12 分钟',
          note: '最后一天评审，也是看今年最好的项目的时候。'
        },
        {
          time: '12:40', name: '午餐', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 60, transit: '步行',
          note: ''
        },
        {
          time: '14:00', name: 'Bonnet House Museum', type: 'sight',
          lat: 26.1331, lng: -80.1045, stay: 90, transit: '打车 6 分钟',
          note: '1920 年宅邸 + 花园，离会场 1 英里，1.5 小时逛完。'
        },
        {
          time: '16:00', name: '回酒店换衣服', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 60, transit: '打车 6 分钟',
          note: 'Gala 有着装要求，一般是正装。'
        },
        {
          time: '17:00', name: '到会场（颁奖典礼）', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 120, transit: '步行 12 分钟',
          note: '提前 2 小时到：先酒会，再入场。'
        },
        {
          time: '19:00', name: 'Gala Dinner 颁奖典礼', type: 'other',
          lat: 26.0996, lng: -80.1190, stay: 180, transit: '会场内',
          note: '年度大奖在这晚揭晓，通常 22:00 前后结束。'
        },
        {
          time: '22:30', name: '回酒店', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 15, transit: '步行 12 分钟',
          note: ''
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-21',
      title: '自由日（两条线都列了，当天二选一）',
      area: 'Fort Lauderdale / Miami',
      summary: '自由日：A 劳德代尔堡慢游 / B 迈阿密建筑线',
      tag: '自由',
      base: { lat: 26.1198, lng: -80.1046 },
      note: '方案 A 就在劳德代尔堡慢一点，方案 B 去迈阿密看建筑。B 线车程 40 分钟，想走 B 就早点出发。',
      items: [
        {
          time: '', name: '方案 A · 劳德代尔堡慢游', type: 'divider',
          note: ''
        },
        {
          time: '09:30', name: '劳德代尔堡海滩', type: 'sight',
          lat: 26.1198, lng: -80.1046, stay: 120, transit: '打车 10 分钟（A1A）',
          note: 'A1A 沿线，可以租躺椅。11 月水温还在 25℃ 左右，下海没问题。'
        },
        {
          time: '11:40', name: '运河游船', type: 'sight',
          lat: 26.1128, lng: -80.1043, stay: 90, transit: '步行到码头',
          note: 'Jungle Queen 或 Water Taxi，看「美国的威尼斯」那些豪宅河道，这条是全城最值的一个项目。'
        },
        {
          time: '13:30', name: 'Las Olas 午餐', type: 'food',
          lat: 26.1195, lng: -80.1345, stay: 80, transit: '打车 10 分钟',
          note: ''
        },
        {
          time: '15:00', name: 'Las Olas 逛街 / 回酒店休息', type: 'shop',
          lat: 26.1180, lng: -80.1330, stay: 120, transit: '步行',
          note: '沿街画廊、买手店；不想逛就回酒店收拾行李。'
        },
        {
          time: '18:00', name: '回酒店', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '打车 10 分钟',
          note: '明早飞机，今晚把行李收好。'
        },
        {
          time: '19:30', name: '晚餐', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 90, transit: '步行',
          note: '最后一晚，找运河边的位置。'
        },
        {
          time: '', name: '方案 B · 迈阿密一日（建筑线）', type: 'divider',
          note: ''
        },
        {
          time: '09:00', name: '出发去 Miami', type: 'transport',
          lat: 25.7444, lng: -80.2103, stay: 45, transit: '自驾或打车约 40 分钟（I-95 南）',
          note: '打车单程约 $50。想省钱包车一天更划算。'
        },
        {
          time: '09:50', name: 'Vizcaya Museum & Gardens', type: 'sight',
          lat: 25.7444, lng: -80.2103, stay: 120, transit: '停车场',
          note: '1916 年意大利文艺复兴式庄园，面朝 Biscayne 湾。必须提前网上订票，现场常售完。'
        },
        {
          time: '12:20', name: 'Wynwood Walls', type: 'sight',
          lat: 25.8011, lng: -80.1994, stay: 100, transit: '打车 15 分钟',
          note: '涂鸦墙 + 画廊区，周围餐厅多，午餐就在这一带解决。'
        },
        {
          time: '14:15', name: 'South Beach / Ocean Drive', type: 'sight',
          lat: 25.7826, lng: -80.1341, stay: 120, transit: '打车 20 分钟',
          note: 'Art Deco 装饰艺术建筑群，沿 Ocean Drive 走一圈比拍照有意思。'
        },
        {
          time: '16:45', name: '回劳德代尔堡', type: 'transport',
          lat: 26.1018, lng: -80.1252, stay: 55, transit: '自驾 40 分钟',
          note: '晚高峰 I-95 会堵，多留时间。'
        },
        {
          time: '18:00', name: '回酒店', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '步行 / 打车',
          note: '明早飞机，今晚把行李收好。'
        },
        {
          time: '19:30', name: '晚餐', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 90, transit: '步行',
          note: '最后一晚，找运河边的位置。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-22',
      title: '劳德代尔堡 → 上海',
      area: '返程',
      summary: '07:20 值机，09:20 起飞回上海',
      tag: '返程',
      base: { lat: 26.0742, lng: -80.1506 },
      note: '国际航班建议提前 3 小时到。还车留 20 分钟，油加满再还。',
      items: [
        {
          time: '06:00', name: '退房', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '前台退房',
          note: '前一晚把行李收好；酒店早餐可能还没开，带走咖啡。'
        },
        {
          time: '06:40', name: '还车', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 25, transit: '开车 12 分钟到 Rental Car Center',
          note: '还车后坐接驳车到航站楼。'
        },
        {
          time: '07:20', name: 'FLL 值机 + 安检', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 120, transit: '步行 + 接驳车',
          note: '国际航班提前 3 小时。达美柜台在 T2，行李直挂到上海。'
        },
        {
          time: '09:20', name: 'FLL → 底特律 → 上海', type: 'transport',
          lat: 31.1443, lng: 121.8083, stay: 300, transit: '经底特律中转，全程约 20 小时',
          note: '具体时刻待核对。中转时间够的话在底特律买点吃的，下一程 13 小时。'
        }
      ]
    }
  ]
};
