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
  decisions: [
    {
      id: 'q1',
      day: 'D1 · 11/13',
      title: '落地当晚直接开去奥兰多，还是住机场附近？',
      hint: '这决定 D2 上午能不能赶上周六市集',
      options: [
        { key: 'a', label: '直接开去奥兰多（23:00 入住）', desc: '当晚开 3 小时夜车，但 D2 早上 8 点市集就在楼下', tag: '累但高效' },
        { key: 'b', label: '住机场附近，次日早上北上', desc: '更稳，但 D2 上午变成赶路，市集和博物馆作废', tag: '保守' }
      ]
    },
    {
      id: 'q2',
      day: 'D2 · 11/14',
      title: '下午走市区线，还是跑一趟赖特线？',
      hint: '赖特线单程 1 小时，要提前预约导览',
      skipIf: { q: 'q1', opt: 'b' },   // 住机场 → 下午只能走赖特线
      options: [
        { key: 'a', label: '市区线：图书馆 + Lake Eola + Church St', desc: '不用再开车，傍晚在市中心吃饭', tag: '省力' },
        { key: 'b', label: '赖特线：Lakeland 赖特校园', desc: '全美最大单一校区赖特建筑群，13 栋；单程 1 小时', tag: '专程' }
      ]
    },
    {
      id: 'q3',
      day: 'D3 · 11/15',
      title: '上午看海牛，还是去更野的水道划船？',
      hint: '两个都要早起，二选一',
      options: [
        { key: 'a', label: 'Blue Spring 看海牛', desc: '海牛季第一天，泉水清澈可见底；人稍多', tag: '看动物' },
        { key: 'b', label: 'Kings Landing 划船', desc: 'Rock Springs Run 上游，水更清人更少，但看不到海牛；只能网上预约', tag: '更野' }
      ]
    },
    {
      id: 'q4',
      day: 'D9 · 11/21',
      title: '自由日：劳德代尔堡慢游，还是迈阿密一日？',
      hint: '迈阿密来回各 1 小时',
      options: [
        { key: 'a', label: '劳德代尔堡 A 线', desc: '海滩 + 水上巴士 + Las Olas，最远 15 分钟', tag: '轻松' },
        { key: 'b', label: '迈阿密 B 线', desc: 'Vizcaya + Wynwood + South Beach，开车 1 小时', tag: '跑一趟' }
      ]
    }
  ],

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
          time: '07:30', name: '上海浦东 T1 · 达美柜台', type: 'transport',
          lat: 31.1443, lng: 121.8083, stay: 150, transit: '打车或地铁 2 号线到浦东',
          note: '国际航班建议提前 3 小时。值机时确认行李直挂到 FLL，问清底特律要不要重新托运。'
        },
        {
          time: '10:00', name: 'PVG → 底特律 DTW（DL388）', type: 'transport',
          lat: 42.2124, lng: -83.3534, stay: 810, transit: '直飞约 13.5 小时',
          note: '当地时间同日 11:31 落地。机上有两顿正餐，落地前把外套拿出来。'
        },
        {
          time: '10:31', name: '底特律中转 4 小时 18 分', type: 'transport',
          lat: 42.2124, lng: -83.3534, stay: 240, transit: 'McNamara 航站楼',
          note: '入境、取行李、海关、重新托运再安检，正常 1 小时内能办完，剩下时间在航站楼吃饭。'
        },
        {
          time: '14:49', name: 'DTW → 劳德代尔堡 FLL（DL1037）', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 170, transit: '约 2 小时 50 分',
          note: '10:31 落地、14:49 起飞，中转 4 小时 18 分，够吃一顿。'
        },
        {
          time: '18:30', name: 'FLL 取租车（Avis）', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 45, transit: '到达层跟随 Rental Car 指示牌',
          note: 'Avis 订单 3008-6751-GB-2（voucher 92236952），卡罗拉或同级 C 型车，不限里程。取车点：600 Terminal Drive 3rd Floor（FLL 租车中心 3 楼），电话 954-359-2500，24 小时营业。柜台要：驾照原件 + 护照 + 主驾驶人本人名下信用卡（MasterCard 6606）。落地 17:51，出关取行李约 40 分钟，18:30 取车刚好，但没缓冲——行李延误就要重排。'
        },
        {
          time: '', name: '方案 A · 当晚直接开到奥兰多（23:00 入住）', type: 'divider',
          br: 'q1:a',
          note: ''
        },
        {
          time: '19:30', name: '开车去奥兰多', br: 'q1:a', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 200, transit: 'I-95 北上转 Florida Turnpike，约 3 小时',
          note: '两个人换着开更安全。夜路车少，但服务区也少，出发前加满油。'
        },
        {
          time: '23:00', name: 'Sheraton Orlando North 入住', br: 'q1:a', type: 'stay',
          lat: 28.5383, lng: -81.3792, stay: 30, transit: '自驾',
          note: '到了直接睡。选市中心或 Winter Park 附近。'
        },
        {
          time: '', name: '方案 B · 今晚住机场附近，明早再北上（更稳）', type: 'divider',
          br: 'q1:b',
          note: ''
        },
        {
          time: '20:00', name: '机场附近酒店 check-in', br: 'q1:b', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 40, transit: '开车 10 分钟',
          note: '可以直接订 17th Street 那家 Holiday Inn Express（就是后面 WAF 住的那家，离机场 2 英里），熟门熟路。'
        },
        {
          time: '20:45', name: '17th Street 晚餐', br: 'q1:b', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 80, transit: '步行 5 分钟',
          note: '运河边随便找一家，吃完就睡。'
        },
        {
          time: '22:00', name: '休息', br: 'q1:b', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '步行',
          note: '明早 9:00 出发，还有时间吃个正经早餐。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-14',
      title: 'Winter Park 深度 · 奥兰多市区',
      area: 'Winter Park / 市中心',
      base: { lat: 28.5963, lng: -81.3539 },
      summary: '周六农贸市集 + 赖特校区 + 蒂芙尼玻璃馆 + 运河船 + 市区图书馆与湖',
      tag: '城市',
      note: '这一天是「城市日」。周六限定：Winter Park 农贸市集只在上午开，所以 8 点就得起。下午四点回市区，图书馆和 Lake Eola 都在步行圈里。',
      items: [
        { time: '', name: '上午 · 已在奥兰多（昨晚走 D1 方案 A）', type: 'divider', br: 'q1:a', note: '' },
        {
          time: '08:00', name: 'Winter Park 农贸市集（周六限定）', br: 'q1:a', type: 'food',
          lat: 28.5963, lng: -81.3539, stay: 55, transit: '打车 20 分钟到 200 W New England Ave',
          note: '每周六 8:00–13:00，在旧火车站仓库里。手工面包、佛罗里达柑橘、鲜花、蜂蜜摊；早餐就在这儿解决——现做的可颂和咖啡是本地人的标配。'
        },
        {
          time: '09:05', name: 'Rollins College', br: 'q1:a', type: 'sight',
          lat: 28.5916, lng: -81.3485, stay: 70, transit: '沿 Park Ave 往南走 10 分钟，从 Holt Ave 正门进',
          note: '1000 Holt Ave。红砖 + 西班牙殖民复兴风格，沿主轴线走到 Lake Virginia 湖边。重点看 Knowles Memorial Chapel（1932 年）和 Mills Memorial（钟楼）。校园全天开放，随便走。'
        },
        {
          time: '10:20', name: 'Morse Museum（蒂芙尼玻璃）', br: 'q1:a', type: 'sight',
          lat: 28.6012, lng: -81.3508, stay: 65, transit: '打车 6 分钟 / 步行 15 分钟，445 N Park Ave',
          note: '全美最重要的装饰艺术收藏之一，Louis Comfort Tiffany 的玻璃、灯饰、礼拜堂。门票几美元，馆不大但密度极高。⚠️ 周二–周六开，周日下午才开，别排错日子。'
        },
        {
          time: '11:32', name: 'Park Avenue 扫街', br: 'q1:a', type: 'shop',
          lat: 28.5975, lng: -81.351, stay: 48, transit: '出馆就是 Park Ave',
          note: '从 Morse Blvd 往南沿 Park Ave 走。这一段集中了书店（Borders 旧址改成的小书店）、买手店、老式药妆店和咖啡馆，橱窗 11 月中已经换圣诞主题。慢慢走，看到喜欢的就进去，不用赶。'
        },
        {
          time: '12:20', name: 'Rifle Paper Co 探店', br: 'q1:a', type: 'shop',
          lat: 28.5951, lng: -81.3507, stay: 25, transit: 'Park Ave 南段，Morse Blvd 往南两个路口',
          note: '这家插画文具品牌的创始店就在 Winter Park，全世界只有这一家旗舰店。纸品、笔记本、手机壳、日历，都是自家插画，价格不便宜但很适合带回国送人。⚠️ 门牌号以地图为准，搜 "Rifle Paper Co Winter Park"。'
        },
        {
          time: '12:50', name: '午餐 Prato', br: 'q1:a', type: 'food',
          lat: 28.5962, lng: -81.3513, stay: 58, transit: '步行 4 分钟回 124 N Park Ave',
          note: '手工意面和柴火披萨，Park Ave 上最稳的一家。12 点半后要等位，这个点进去刚好错峰；想换口味就去 The Ravenous Pig（565 W Fairbanks Ave）新美式。'
        },
        {
          time: '13:50', name: 'Scenic Boat Tour 运河游船', br: 'q1:a', type: 'sight',
          lat: 28.5973, lng: -81.3472, stay: 70, transit: '步行 6 分钟到 312 E Morse Blvd',
          note: '一小时的平底船，穿过 Winter Park 的运河看湖边豪宅，讲解很逗。整点发船（10:00–16:00），$20 左右，早点去排队。这条路是我觉得全城最值的一个项目。'
        },
        {
          time: '15:15', name: 'Kraft Azalea Garden（Casa Feliz 周六闭馆）', br: 'q1:a', type: 'sight',
          lat: 28.5918, lng: -81.3487, stay: 50, transit: '打车 5 分钟（1365 Alabama Dr）',
          note: '原本想去的 Casa Feliz（656 N Park Ave）只在周二–周四 10:00–14:00 开放，周六闭馆，所以这天改去 Kraft Azalea Garden（1365 Alabama Dr）——湖边小花园，免费，日出到日落，傍晚光线最好。想看 Casa Feliz 只能换到别的日子，但你行程里没有合适的半天。'
        },
        {
          time: '16:25', name: '打车去市中心', br: 'q1:a', type: 'transport',
          lat: 28.5423, lng: -81.3785, stay: 25, transit: '打车 20 分钟',
          note: ''
        },
        { time: '', name: '下午到晚上 · 市区线（图书馆 → Lake Eola → 晚餐 → Church St）', type: 'divider', br: 'q2:a', note: '' },
        {
          time: '16:55', name: 'Orlando Public Library', br: 'q2:a', type: 'sight',
          lat: 28.5423, lng: -81.3785, stay: 40, transit: '101 E Central Blvd',
          note: '1986 年扩建的玻璃中庭，光很好。1 楼主厅抬头看结构，2–3 楼有本地历史展。旁边就是 Orange County Regional History Center（65 E Central Blvd），想看老法院改造的展馆可以顺路进去。'
        },
        {
          time: '17:40', name: 'Lake Eola Park', br: 'q2:a', type: 'sight',
          lat: 28.5433, lng: -81.3728, stay: 45, transit: '步行 8 分钟，512 E Washington St',
          note: '环湖 1.2 公里，天鹅船 30 分钟约 $15。傍晚喷泉配天际线是拍照点。周日下午这里还有露天市集（见 D3 备注）。'
        },
        {
          time: '18:30', name: '市中心晚餐', br: 'q2:a', type: 'food',
          lat: 28.5405, lng: -81.3795, stay: 90, transit: '步行 8 分钟到 Thornton Park',
          note: 'Thornton Park 一带（E Washington St × N Summerlin Ave）餐馆密度最高，Hawkers 亚洲街头小吃就在附近。'
        },
        {
          time: '20:10', name: 'Church Street Station', br: 'q2:a', type: 'sight',
          lat: 28.5413, lng: -81.3813, stay: 50, transit: '步行 12 分钟 / 开车 5 分钟，129 W Church St',
          note: '1889 年的老火车站改的街区，红砖月台和铁架天桥还在。白天没什么人，晚上 20 点后酒吧和 live music 才开场——所以放在饭后正好。周六晚上最热闹。'
        },
        {
          time: '21:10', name: '回酒店', br: 'q2:a', type: 'stay',
          lat: 26.1455, lng: -80.1055, stay: 30, transit: '开车 20 分钟回 Maitland',
          note: '第二天 7:30 要去 Blue Spring，别逛太晚。'
        },
        { time: '', name: '上午 · 昨晚住机场（D1 方案 B）', type: 'divider', br: 'q1:b', note: '' },
        {
          time: '09:05', name: '出发北上奥兰多', br: 'q1:b', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 195, transit: 'I-95 转 Turnpike，约 3 小时',
          note: '睡到 7:30 再走，酒店吃完早餐出发。⚠️ 走这条线就赶不上周六市集和上午的博物馆了。'
        },
        {
          time: '12:20', name: '到奥兰多，午餐', br: 'q1:b', type: 'food',
          lat: 28.5383, lng: -81.3792, stay: 60, transit: '直接开到市区',
          note: '吃完接下面的市区线（图书馆 → Lake Eola → Church St）。'
        },
        { time: '', name: '下午 · 赖特线（Lakeland，单程 1 小时）', type: 'divider', br: 'q2:b', note: '' },
        {
          time: '12:40', name: '出发去 Lakeland', br: 'q2:b', type: 'transport',
          lat: 28.0306, lng: -81.9479, stay: 60, transit: '打车单程约 1 小时（I-4 向西）',
          note: '打车往返约 $130–160；回程容易叫不到车，提前和司机约好。13:45 到游客中心正好赶上 14:00 的导览。'
        },
        {
          time: '13:45', name: 'Florida Southern College', br: 'q2:b', type: 'sight',
          lat: 28.0306, lng: -81.9479, stay: 130, transit: '步行到游客中心',
          note: '导览每天只有 10:00 和 14:00 两场（Basic，90 分钟，$45/人），提前 24 小时网上订。全美最大规模的单一校区赖特建筑群，13 栋。'
        },
        {
          time: '15:55', name: '校园自由逛', br: 'q2:b', type: 'sight',
          lat: 28.033, lng: -81.945, stay: 45, transit: '步行',
          note: '重点看 Annie Pfeiffer Chapel 和 Water Dome 喷泉，连廊（Esplanades）本身也是赖特的作品。'
        },
        {
          time: '16:45', name: '回奥兰多', br: 'q2:b', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 60, transit: '打车 1 小时',
          note: ''
        },
        {
          time: '18:00', name: '晚餐', br: 'q2:b', type: 'food',
          lat: 28.54, lng: -81.376, stay: 90, transit: '步行',
          note: ''
        },
        {
          time: '20:30', name: '回酒店', br: 'q2:b', type: 'stay',
          lat: 28.5383, lng: -81.3792, stay: 30, transit: '打车 15 分钟',
          note: '明天去 Blue Spring 要早起。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-15',
      title: 'Blue Spring 看海牛 · Mount Dora 旧物集市',
      area: 'Orange City / Mount Dora',
      base: { lat: 28.9487, lng: -81.3396 },
      summary: '早上海牛 + 下午 Mount Dora 跳蚤市场与老城',
      tag: '自然',
      note: '11/15 正好是海牛季第一天。下午把路线往北延伸一站：Mount Dora 周日有跳蚤市场和古董中心，比回城逛公园有意思。',
      items: [
        { time: '', name: '上午 · Blue Spring', type: 'divider', br: 'q3:a', note: '' },
        {
          time: '07:30', name: '出发', br: 'q3:a', type: 'transport',
          lat: 28.9487, lng: -81.3396, stay: 50, transit: '自驾或打车约 45 分钟（I-4 转 17-92）',
          note: '越早越好：清晨海牛最活跃，人也最少。'
        },
        {
          time: '08:30', name: 'Blue Spring State Park 皮划艇', br: 'q3:a', type: 'sight',
          lat: 28.9487, lng: -81.3396, stay: 180, transit: '园内码头（2100 W French Ave）',
          note: '订 2–3 小时的 guided kayak tour（含装备）。海牛季泉眼水道禁船，皮划艇在圣约翰河段下水，照样能看到。带防蚊液和换洗衣服。'
        },
        { time: '', name: '备选 · 不想看海牛就划 Kings Landing', type: 'divider', br: 'q3:b', note: '' },
        {
          time: '08:30', name: 'Kings Landing 划船', br: 'q3:b', type: 'sight',
          lat: 28.7637, lng: -81.5148, stay: 210, transit: '自驾 50 分钟（Apopka，Kelly Park 北侧）',
          note: 'Rock Springs Run 上游放船，水清见底、柏树林夹岸，比 Blue Spring 野。只能官网预约，不接受现场；划 2.5–4 小时。代价是看不到海牛，而且不经过 Sanford。'
        },
        { time: '', name: '中午 · Sanford → Mount Dora', type: 'divider', note: '' },
        {
          time: '12:00', name: 'Sanford 老城午餐', type: 'food',
          lat: 28.8127, lng: -81.2687, stay: 70, transit: '开车 25 分钟（沿 US-17/92 南下）',
          note: 'Sanford 的 Magnolia Ave 一带是老城餐馆区，河边的位置多。The Willow Tree Cafe（德国菜）分量大，适合划完船补热量。'
        },
        {
          time: '13:30', name: 'Renninger\'s 跳蚤市场 + 古董中心', type: 'sight',
          lat: 28.8177, lng: -81.6486, stay: 90, transit: '开车 40 分钟（20651 US-441, Mount Dora）',
          note: '周日开：跳蚤市场人气最旺，古董中心三层楼，从美式旧家具到小玩意儿都有。⚠️ 摊位和营业时间以官网为准，去之前看一眼。'
        },
        {
          time: '15:20', name: 'Mount Dora 老城', type: 'shop',
          lat: 28.7999, lng: -81.6443, stay: 70, transit: '开车 5 分钟到 Donnelly St',
          note: 'Donnelly St 是主街，古董店、书店、咖啡馆一路排开。走到湖滨看 Mount Dora 灯塔（1 Lighthouse Cir），傍晚风很舒服。'
        },
        {
          time: '16:40', name: '回奥兰多', type: 'transport',
          lat: 28.5383, lng: -81.3792, stay: 60, transit: '开车 50 分钟（FL-429 / Turnpike）',
          note: ''
        },
        { time: '', name: '傍晚 · 奥兰多', type: 'divider', note: '' },
        {
          time: '17:50', name: 'Lake Baldwin 狗公园（可选）', type: 'sight',
          lat: 28.573, lng: -81.326, stay: 45, transit: '开车 20 分钟（2070 Lake Baldwin Ln）',
          note: '奥兰多最有名的湖滨狗公园，周末下午常有狗主人聚会，没狗也能在旁边步道走走看热闹。不想去就直接吃饭。'
        },
        {
          time: '18:45', name: '晚餐', type: 'food',
          lat: 28.54, lng: -81.376, stay: 90, transit: '开车 15 分钟',
          note: '明天去迪士尼要早起，今晚别太晚。'
        },
        {
          time: '20:15', name: '换酒店：Embassy Suites Sunset Walk', type: 'stay',
          lat: 28.5383, lng: -81.3792, stay: 30, transit: '打车',
          note: ''
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
          time: '08:00', name: '出发（Sunset Walk → Animal Kingdom）', type: 'transport',
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
      title: '肯尼迪航天中心一整天 → 劳德代尔堡',
      area: 'Cape Canaveral / Fort Lauderdale',
      base: { lat: 28.5729, lng: -80.6490 },
      summary: '开园 9:00 到闭园 17:00，巴士导览 + 土星五号 + Atlantis 全刷完',
      tag: '航天',
      note: '这一天把 KSC 玩到闭园，晚上到劳德代尔堡 20:30 左右，晚饭 21:00 不算晚——附近有几家开到 23:00。',
      items: [
        { time: '', name: '上午 · 开园即进', type: 'divider', note: '' },
        {
          time: '07:10', name: '退房出发（Kissimmee → KSC 约 80 分钟）', type: 'transport',
          lat: 28.5729, lng: -80.6490, stay: 70, transit: '自驾 FL-528 向东，约 1 小时 10 分',
          note: '早点走，路上买杯咖啡。园区 9:00 开门，8:50 到停车场刚好。'
        },
        {
          time: '08:50', name: '停车 + 安检入园', type: 'transport',
          lat: 28.5233, lng: -80.6819, stay: 15, transit: '游客中心主入口',
          note: '停车 $10。进门先拿一张当天的演出/巴士时刻表——后面的顺序要按它调整。'
        },
        {
          time: '09:05', name: 'Heroes & Legends（航天员名人堂）', type: 'sight',
          lat: 28.5233, lng: -80.6819, stay: 55, transit: '进门右手边',
          note: '室内馆，趁早上凉快先看。水星/双子星/阿波罗三代航天员的故事，有真飞船。'
        },
        {
          time: '10:00', name: '火箭花园', type: 'sight',
          lat: 28.5233, lng: -80.6819, stay: 20, transit: '园区中央',
          note: '室外，八支真火箭立着。拍照 15 分钟够，正午太晒，趁现在。'
        },
        { time: '', name: '上午到下午 · 巴士导览 + 土星五号', type: 'divider', note: '' },
        {
          time: '10:25', name: '巴士导览出发', type: 'transport',
          lat: 28.5233, lng: -80.6819, stay: 30, transit: '园区巴士站（首班车约 10:00，以现场牌为准）',
          note: '这是全园最费时的项目：车程 30 分钟穿过 NASA 厂区，路过总装大楼（VAB）和发射台。'
        },
        {
          time: '10:55', name: 'Apollo / Saturn V Center', type: 'sight',
          lat: 28.6084, lng: -80.6043, stay: 110, transit: '巴士直接送到',
          note: '躺着的土星五号整支火箭，从这头走到那头要 100 米。还有阿波罗 14 号返回舱、月岩可以摸。⭐ 这是整个 KSC 最值的一站，别赶。'
        },
        {
          time: '12:45', name: 'Moon Rock Cafe 午餐', type: 'food',
          lat: 28.6084, lng: -80.6043, stay: 45, transit: '土星五号中心内',
          note: '就在馆里吃，省一趟往返。不想吃快餐可以回主园区再吃，但会挤掉后面的时间。'
        },
        {
          time: '13:30', name: '巴士返回主园区', type: 'transport',
          lat: 28.5233, lng: -80.6819, stay: 30, transit: '同站台',
          note: '班次密，不用赶。'
        },
        { time: '', name: '下午 · Atlantis 与未来', type: 'divider', note: '' },
        {
          time: '14:00', name: 'Space Shuttle Atlantis 展馆', type: 'sight',
          lat: 28.5233, lng: -80.6819, stay: 90, transit: '主园区西侧',
          note: '真机 Atlantis 挂在 90 度倾斜的位置，机舱门开着。先看 8 分钟的入场影片再进展厅，顺序别反。附带 Shuttle Launch Experience 模拟发射（排队 15–30 分钟）。'
        },
        {
          time: '15:30', name: 'Gateway: The Deep Space Launch', type: 'sight',
          lat: 28.5233, lng: -80.6819, stay: 45, transit: 'Atlantis 隔壁',
          note: '2022 年新开，四层楼的深空探索展 + 两个 4D 飞行影院。人少的时候可以直接连刷。'
        },
        {
          time: '16:15', name: 'IMAX 电影', type: 'sight',
          lat: 28.5233, lng: -80.6819, stay: 40, transit: '园区东侧影院',
          note: '看当天场次，赶不上就跳过。片长 40 分钟左右，讲太空站或登月。'
        },
        {
          time: '16:55', name: '商店买纪念品', type: 'shop',
          lat: 28.5233, lng: -80.6819, stay: 20, transit: '出口旁的主商店',
          note: '17:00 闭园，商店最后关。NASA 标志的帽子和任务徽章值得买。'
        },
        { time: '', name: '晚上 · 南下劳德代尔堡', type: 'divider', note: '' },
        {
          time: '17:15', name: '出发南下', type: 'transport',
          lat: 26.0745, lng: -80.1504, stay: 195, transit: 'FL-528 转 I-95 南下，约 3 小时 15 分',
          note: '全程 340 公里。18:30 左右在 Fort Pierce 服务区停一次，加油 + 上厕所。'
        },
        {
          time: '20:30', name: 'Holiday Inn Express 入住', type: 'stay',
          lat: 26.1006, lng: -80.1189, stay: 30, transit: '1500 SE 17th St Causeway',
          note: '放下行李就走，餐厅在步行范围。'
        },
        {
          time: '21:05', name: '晚餐 Boatyard', type: 'food',
          lat: 26.1003, lng: -80.1197, stay: 80, transit: '步行 8 分钟（1555 SE 17th St）',
          note: '运河边，厨房到 22:00。到店先问还能不能点；想吃更好的海鲜就改天再去 15th Street Fisheries（也在附近，厨房关得早）。'
        },
        {
          time: '22:30', name: '回酒店休息', type: 'stay',
          lat: 26.1006, lng: -80.1189, stay: 15, transit: '步行',
          note: '明天 WAF 第一天，早点睡。'
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
      title: '海滩片区半日 · 颁奖典礼',
      area: 'Fort Lauderdale Beach',
      base: { lat: 26.1455, lng: -80.1055 },
      summary: '海滩散步 + Coconuts 午餐 + Bonnet House，三处相距不到 2 公里',
      tag: '海边',
      note: '不听 crit 后，上午正好补上海滩这一片。海滩、Coconuts、Bonnet House 都在 A1A 到 Birch Rd 这一小片，开车最远 6 分钟。下午 14:45 就回酒店，熨衣服、补觉都来得及。',
      items: [
        { time: '', name: '上午 · 海滩片区', type: 'divider', note: '' },
        {
          time: '08:30', name: '酒店早餐', type: 'food',
          lat: 26.1006, lng: -80.1189, stay: 45, transit: '酒店内',
          note: '这家 Holiday Inn Express 的早餐到 9:30，别拖。'
        },
        {
          time: '09:20', name: '出发去海滩', type: 'transport',
          lat: 26.1455, lng: -80.1055, stay: 20, transit: '开车 15 分钟（3109 E Sunrise Blvd）',
          note: '打车约 $14。沿 Las Olas Blvd 一直往东到海边，再往北就是 A1A 海滩段。'
        },
        {
          time: '09:40', name: 'Fort Lauderdale 海滩散步', type: 'sight',
          lat: 26.1315, lng: -80.1042, stay: 70, transit: '开车 15 分钟，停在 A1A 沿线收费停车位（约 $4/小时）',
          note: '从 Las Olas Blvd 东端往北走，棕榈夹道、白色矮墙，走到 Sunrise Blvd 折返。11 月早上不晒，海风凉快。想下水就带泳衣，水温约 25°C。'
        },
        {
          time: '10:55', name: 'Las Olas 东段喝杯咖啡', type: 'food',
          lat: 26.1195, lng: -80.1043, stay: 35, transit: '开车 5 分钟 / 步行 20 分钟',
          note: '海滩边一排咖啡馆，坐室外看人来人往。不用吃多，中午还有 Coconuts。'
        },
        {
          time: '11:25', name: '走到 Coconuts 午餐', type: 'food',
          lat: 26.128, lng: -80.1078, stay: 80, transit: '开车 6 分钟（429 Seabreeze Blvd）',
          note: '11:30 开门就进，能占到水边露台位。11 月中午坐户外正好。'
        },
        {
          time: '13:00', name: 'Bonnet House Museum & Gardens', type: 'sight',
          lat: 26.1352, lng: -80.1053, stay: 95, transit: '开车 4 分钟 / 步行 15 分钟（900 N Birch Rd）',
          note: '900 N Birch Rd，海边那片最后的私人庄园。1920 年建的加勒比风格，主人是画家 Frederic Bartlett，屋里还留着他的画和收藏。周二–周日 11:00–16:00，最后入场 16:00。'
        },
        { time: '', name: '下午 · 回酒店准备', type: 'divider', note: '' },
        {
          time: '14:45', name: '回酒店', type: 'stay',
          lat: 26.1006, lng: -80.1189, stay: 120, transit: '开车 12 分钟',
          note: '比原来早一个半小时。熨正装、补觉、洗个澡，晚上 Gala 要站很久。'
        },
        {
          time: '16:50', name: '去会场', type: 'transport',
          lat: 26.0995, lng: -80.1155, stay: 15, transit: '开车 8 分钟 / 打车约 $10',
          note: '17:00 有酒会，提前 10 分钟到。'
        },
        {
          time: '17:00', name: 'WAF 酒会', type: 'other',
          lat: 26.0995, lng: -80.1155, stay: 120, transit: '会场',
          note: 'Gala 前的 social，别空着肚子喝。'
        },
        {
          time: '19:00', name: 'Gala Dinner 颁奖典礼', type: 'other',
          lat: 26.0995, lng: -80.1155, stay: 180, transit: '会场',
          note: '正装。颁奖在晚饭后，坐着的时候不多，鞋子别选太新的。'
        },
        {
          time: '22:30', name: '回酒店', type: 'stay',
          lat: 26.1006, lng: -80.1189, stay: 15, transit: '打车',
          note: '明天自由日，可以睡懒觉。'
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
          br: 'q4:a',
          note: ''
        },
        {
          time: '09:30', name: '劳德代尔堡海滩', br: 'q4:a', type: 'sight',
          lat: 26.1198, lng: -80.1046, stay: 120, transit: '打车 10 分钟（A1A）',
          note: 'A1A 沿线，可以租躺椅。11 月水温还在 25℃ 左右，下海没问题。'
        },
        {
          time: '11:40', name: '运河游船', br: 'q4:a', type: 'sight',
          lat: 26.1128, lng: -80.1043, stay: 90, transit: '步行到码头',
          note: 'Jungle Queen 或 Water Taxi，看「美国的威尼斯」那些豪宅河道，这条是全城最值的一个项目。'
        },
        {
          time: '13:30', name: 'Las Olas 午餐', br: 'q4:a', type: 'food',
          lat: 26.1195, lng: -80.1345, stay: 80, transit: '打车 10 分钟',
          note: ''
        },
        {
          time: '15:00', name: 'Las Olas 逛街 / 回酒店休息', br: 'q4:a', type: 'shop',
          lat: 26.1180, lng: -80.1330, stay: 120, transit: '步行',
          note: '沿街画廊、买手店；不想逛就回酒店收拾行李。'
        },
        {
          time: '18:00', name: '回酒店', br: 'q4:a', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '打车 10 分钟',
          note: '明早飞机，今晚把行李收好。'
        },
        {
          time: '19:30', name: '晚餐', br: 'q4:a', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 90, transit: '步行',
          note: '最后一晚，找运河边的位置。'
        },
        {
          time: '', name: '方案 B · 迈阿密一日（建筑线）', type: 'divider',
          br: 'q4:b',
          note: ''
        },
        {
          time: '09:00', name: '出发去 Miami', br: 'q4:b', type: 'transport',
          lat: 25.7444, lng: -80.2103, stay: 45, transit: '自驾或打车约 40 分钟（I-95 南）',
          note: '打车单程约 $50。想省钱包车一天更划算。'
        },
        {
          time: '09:50', name: 'Vizcaya Museum & Gardens', br: 'q4:b', type: 'sight',
          lat: 25.7444, lng: -80.2103, stay: 120, transit: '停车场',
          note: '1916 年意大利文艺复兴式庄园，面朝 Biscayne 湾。必须提前网上订票，现场常售完。'
        },
        {
          time: '12:20', name: 'Wynwood Walls', br: 'q4:b', type: 'sight',
          lat: 25.8011, lng: -80.1994, stay: 100, transit: '打车 15 分钟',
          note: '涂鸦墙 + 画廊区，周围餐厅多，午餐就在这一带解决。'
        },
        {
          time: '14:15', name: 'South Beach / Ocean Drive', br: 'q4:b', type: 'sight',
          lat: 25.7826, lng: -80.1341, stay: 120, transit: '打车 20 分钟',
          note: 'Art Deco 装饰艺术建筑群，沿 Ocean Drive 走一圈比拍照有意思。'
        },
        {
          time: '16:45', name: '回劳德代尔堡', br: 'q4:b', type: 'transport',
          lat: 26.1018, lng: -80.1252, stay: 55, transit: '自驾 40 分钟',
          note: '晚高峰 I-95 会堵，多留时间。'
        },
        {
          time: '18:00', name: '回酒店', br: 'q4:b', type: 'stay',
          lat: 26.1018, lng: -80.1252, stay: 30, transit: '步行 / 打车',
          note: '明早飞机，今晚把行李收好。'
        },
        {
          time: '19:30', name: '晚餐', br: 'q4:b', type: 'food',
          lat: 26.1030, lng: -80.1240, stay: 90, transit: '步行',
          note: '最后一晚，找运河边的位置。'
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      date: '2026-11-22',
      title: '劳德代尔堡 → 西雅图 → 上海',
      area: 'Fort Lauderdale / 西雅图',
      base: { lat: 26.0742, lng: -80.1506 },
      summary: '08:21 起飞，04:30 就得起床。经西雅图转机，次日 19:55 到上海',
      tag: '返程',
      note: 'DL356 08:21 起飞，国际航班要提前 3 小时，等于 05:20 前到机场——这是一次半夜出发。前一晚把行李收好、打包早餐。',
      items: [
        {
          time: '04:30', name: '退房', type: 'stay',
          lat: 26.1006, lng: -80.1189, stay: 15, transit: '1500 SE 17th St',
          note: '酒店早餐 06:00 才开，别指望。前一晚让前台准备两份打包早餐，或者自己买好放在房间。'
        },
        {
          time: '04:45', name: '开车去 FLL', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 15, transit: 'SE 17th St → I-595，约 10 分钟',
          note: '凌晨路上没车。'
        },
        {
          time: '05:00', name: '还车（Avis）', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 20, transit: '租车中心 → 航站楼步行',
          note: '订单写的还车时间是 06:30，但 08:21 的航班来不及——提前到 05:00 还，早还车不加钱（9 天有效期到 11/22 18:30）。还完车坐租车中心接驳车到航站楼，约 10 分钟。前一晚加满油。'
        },
        {
          time: '05:20', name: '值机 + 安检 + 出境', type: 'transport',
          lat: 26.0742, lng: -80.1506, stay: 175, transit: '达美柜台 T2',
          note: '距起飞 3 小时。凌晨 FLL 安检人少，但国际出境柜台可能只开一两个窗口，别赌。'
        },
        {
          time: '08:21', name: 'DL356 · FLL → 西雅图', type: 'transport',
          lat: 47.4502, lng: -122.3088, stay: 399, transit: '约 6 小时 39 分',
          note: '横跨三个时区，落地是当地时间 12:00。行李直挂上海。'
        },
        {
          time: '12:00', name: '西雅图转机 2 小时 40 分', type: 'transport',
          lat: 47.4502, lng: -122.3088, stay: 160, transit: 'SEA 同一航站楼',
          note: '时间不算宽裕：下机后要走一段，再过边检。别逛免税店，先看下一班登机口。'
        },
        {
          time: '14:40', name: 'DL281 · 西雅图 → 上海浦东', type: 'transport',
          lat: 31.1443, lng: 121.8083, stay: 795, transit: '约 13 小时 15 分',
          note: '当地 11/22 14:40 起飞，11/23 19:55 到浦东。'
        },
        {
          time: '19:55', name: '到达上海浦东（11/23）', type: 'transport',
          lat: 31.1443, lng: 121.8083, stay: 60, transit: '次日',
          note: '落地后取行李、出关，回家。'
        }
      ]
    }
  ]
};
