/* =========================================================================
 * 行程数据文件 —— 只改这个文件就能改行程
 * -------------------------------------------------------------------------
 * 字段说明：
 *   title     行程标题
 *   subtitle  一句话说明（可选）
 *   timezone  IANA 时区，日出日落/月相按这个时区算（东京 = "Asia/Tokyo"）
 *   people    人数（仅用于显示）
 *   days[]    每天一项：
 *     date   "YYYY-MM-DD"
 *     title  当天主题，如 "涩谷 · 六本木"
 *     area   住宿/活动区域（可选）
 *     base   计算日出日落用的坐标（一般填当天住宿点或活动中心）
 *     note   当天备注（可选）
 *     items[] 当天行程点：
 *       time    到达时间 "HH:mm"（当地时间）
 *       name    地点名
 *       type    类型：transport 交通 / sight 景点 / food 吃 / stay 住宿 / shop 购物 / other
 *       lat,lng 纬度、经度（小数度，北纬东经为正）
 *       stay    停留分钟数
 *       transit 从上一站到这里的方式和时长，如 "地铁 12 分钟"（可选）
 *       note    备注（可选）
 * ========================================================================= */

window.TRIP = {
  title: '东京 · 箱根',
  subtitle: '第一次东京 + 富士山，2 人，7 天',
  timezone: 'Asia/Tokyo',
  people: 2,
  days: [
    {
      date: '2026-11-14',
      title: '抵达东京 · 新宿',
      area: '新宿',
      base: { lat: 35.6938, lng: 139.7034 },
      note: '长途飞行，别安排太满；落地先买 Suica。',
      items: [
        {
          time: '14:30', name: '成田机场 T1 入境', type: 'transport',
          lat: 35.7719, lng: 140.3929, stay: 70, transit: '飞机 3.5 小时',
          note: '提前在 Visit Japan Web 填好入境码，走 QR 通道。'
        },
        {
          time: '16:10', name: '成田特快 N\'EX → 新宿', type: 'transport',
          lat: 35.6896, lng: 139.7006, stay: 80, transit: '步行 5 分钟到 B1 站台',
          note: '全车指定席，机场 B1 的 JR 售票处买往返票更便宜。'
        },
        {
          time: '17:45', name: '酒店 check-in', type: 'stay',
          lat: 35.6938, lng: 139.7034, stay: 45, transit: '步行 8 分钟',
          note: '放行李、洗澡，19:00 前出门。'
        },
        {
          time: '19:00', name: '思い出横丁 晚餐', type: 'food',
          lat: 35.6930, lng: 139.6995, stay: 90, transit: '步行 6 分钟',
          note: '串烧 + 生啤，位子小、人多，两人去最好。'
        },
        {
          time: '20:40', name: '东京都厅 南展望室', type: 'sight',
          lat: 35.6896, lng: 139.6917, stay: 45, transit: '步行 12 分钟',
          note: '免费，21:30 停止入场；天气好能看到富士山轮廓。'
        }
      ]
    },
    {
      date: '2026-11-15',
      title: '涩谷 · 表参道 · 六本木',
      area: '涩谷 / 六本木',
      base: { lat: 35.6604, lng: 139.7292 },
      note: '这天步行量大，穿好走的鞋。',
      items: [
        {
          time: '09:30', name: '明治神宫', type: 'sight',
          lat: 35.6764, lng: 139.6993, stay: 90, transit: '地铁 20 分钟',
          note: '从原宿口进，参道很长；11 月银杏刚黄。'
        },
        {
          time: '11:20', name: '竹下通', type: 'shop',
          lat: 35.6717, lng: 139.7031, stay: 50, transit: '步行 5 分钟',
          note: '可丽饼排队最长的两家值得排；人多时走侧巷。'
        },
        {
          time: '12:40', name: '表参道 午餐', type: 'food',
          lat: 35.6654, lng: 139.7124, stay: 90, transit: '步行 10 分钟',
          note: '周末热门店要排队，12:40 到还算早。'
        },
        {
          time: '14:30', name: 'SHIBUYA SKY 展望台', type: 'sight',
          lat: 35.6580, lng: 139.7016, stay: 80, transit: '地铁 8 分钟',
          note: '必须提前在网上订 15:00 的时段票；顶层风大，寄存包。'
        },
        {
          time: '16:30', name: '涩谷十字路口', type: 'sight',
          lat: 35.6595, lng: 139.7005, stay: 30, transit: '步行 4 分钟',
          note: '站二楼星巴克窗边拍人潮。'
        },
        {
          time: '17:40', name: '六本木 森美术馆 & 展望台', type: 'sight',
          lat: 35.6604, lng: 139.7292, stay: 120, transit: '地铁 15 分钟',
          note: '52F 展望台看日落 + 东京塔亮灯，日落前 40 分钟到最好。'
        },
        {
          time: '20:00', name: '六本木 晚餐', type: 'food',
          lat: 35.6627, lng: 139.7314, stay: 90, transit: '步行 6 分钟',
          note: ''
        }
      ]
    },
    {
      date: '2026-11-16',
      title: '浅草 · 上野 · 秋叶原',
      area: '台东区',
      base: { lat: 35.7148, lng: 139.7967 },
      note: '早上 9 点前的浅草寺几乎没人，值得早起。',
      items: [
        {
          time: '08:30', name: '浅草寺 雷门', type: 'sight',
          lat: 35.7148, lng: 139.7967, stay: 90, transit: '地铁 25 分钟',
          note: '先在仲见世买人形烧；抽签凶的话系在架子上就行。'
        },
        {
          time: '10:30', name: '上野公园', type: 'sight',
          lat: 35.7148, lng: 139.7745, stay: 40, transit: '地铁 10 分钟',
          note: ''
        },
        {
          time: '11:20', name: '东京国立博物馆', type: 'sight',
          lat: 35.7188, lng: 139.7765, stay: 110, transit: '步行 8 分钟',
          note: '本馆 2 小时足够；周一若闭馆改为西洋美术馆。'
        },
        {
          time: '13:30', name: '阿美横町 午餐', type: 'food',
          lat: 35.7089, lng: 139.7745, stay: 60, transit: '步行 10 分钟',
          note: '海鲜丼 + 水果串，现金更方便。'
        },
        {
          time: '15:00', name: '秋叶原', type: 'shop',
          lat: 35.6984, lng: 139.7731, stay: 120, transit: '地铁 6 分钟',
          note: '电器比价去 Yodobashi，二手手办去 Mandarake。'
        },
        {
          time: '17:40', name: '东京站 丸之内', type: 'sight',
          lat: 35.6812, lng: 139.7671, stay: 60, transit: '地铁 8 分钟',
          note: '红砖站房日落亮灯，KITTE 屋顶花园免费。'
        },
        {
          time: '19:00', name: '东京站 晚餐', type: 'food',
          lat: 35.6820, lng: 139.7660, stay: 90, transit: '步行 5 分钟',
          note: '拉面街在 B1，人多就上楼吃。'
        }
      ]
    },
    {
      date: '2026-11-17',
      title: '箱根一日：大涌谷 · 芦之湖 · 温泉',
      area: '箱根',
      base: { lat: 35.2323, lng: 139.1069 },
      note: '这天要换乘 5 次以上，买箱根周游券（2 日）比单买划算。',
      items: [
        {
          time: '07:30', name: '新宿站 小田急浪漫特快', type: 'transport',
          lat: 35.6896, lng: 139.7006, stay: 85, transit: '步行 5 分钟',
          note: '需要提前订座，08:55 到箱根汤本。'
        },
        {
          time: '09:10', name: '箱根汤本駅', type: 'transport',
          lat: 35.2323, lng: 139.1069, stay: 30, transit: '火车 85 分钟',
          note: '买周游券、寄行李；登山电车从这里出发。'
        },
        {
          time: '09:50', name: '大涌谷', type: 'sight',
          lat: 35.2444, lng: 139.0197, stay: 70, transit: '登山电车 + 缆车 40 分钟',
          note: '硫磺味很重，别穿好衣服；黑玉子限购。'
        },
        {
          time: '11:40', name: '桃源台 芦之湖', type: 'sight',
          lat: 35.2016, lng: 139.0275, stay: 40, transit: '缆车 25 分钟',
          note: '晴天在缆车上能看到富士山。'
        },
        {
          time: '12:30', name: '海盗船 → 元箱根', type: 'transport',
          lat: 35.2046, lng: 139.0258, stay: 40, transit: '步行 5 分钟到码头',
          note: '班次 30~40 分钟一班，看好时刻表。'
        },
        {
          time: '13:20', name: '箱根神社 平和の鳥居', type: 'sight',
          lat: 35.2046, lng: 139.0258, stay: 60, transit: '步行 10 分钟',
          note: '鸟居在水里，排队拍照约 15 分钟。'
        },
        {
          time: '15:00', name: '箱根汤本 日归温泉', type: 'stay',
          lat: 35.2323, lng: 139.1069, stay: 120, transit: '巴士 35 分钟',
          note: '毛巾另买；泡完正好赶 18:00 的车。'
        },
        {
          time: '18:00', name: '回新宿', type: 'transport',
          lat: 35.6896, lng: 139.7006, stay: 90, transit: '火车 85 分钟',
          note: '浪漫特快需再订座，或坐普通车到小田原换。'
        },
        {
          time: '20:00', name: '新宿 晚餐', type: 'food',
          lat: 35.6930, lng: 139.6995, stay: 90, transit: '步行 8 分钟',
          note: '累了就叫酒店附近的定食。'
        }
      ]
    },
    {
      date: '2026-11-18',
      title: '河口湖 · 富士山',
      area: '山梨',
      base: { lat: 35.4989, lng: 138.7683 },
      note: '全天看天气；云厚就待在东京，改成购物日。',
      items: [
        {
          time: '07:00', name: '新宿 → 河口湖 高速巴士', type: 'transport',
          lat: 35.4989, lng: 138.7683, stay: 165, transit: '步行 6 分钟到南口',
          note: '必须提前网上订座；坐左侧靠窗能看到富士山。'
        },
        {
          time: '10:00', name: '河口湖駅', type: 'transport',
          lat: 35.4989, lng: 138.7683, stay: 20, transit: '巴士 2 小时 45 分',
          note: '买富士五湖周游券（2 日）。'
        },
        {
          time: '10:30', name: '天上山公园 缆车', type: 'sight',
          lat: 35.5055, lng: 138.7660, stay: 60, transit: '步行 8 分钟',
          note: '缆车排队 20 分钟起；山顶看湖 + 富士山同框。'
        },
        {
          time: '12:00', name: '河口湖 ほうとう 午餐', type: 'food',
          lat: 35.5020, lng: 138.7690, stay: 70, transit: '下山步行 10 分钟',
          note: '不动ほうとう 排队久，12:00 前到。'
        },
        {
          time: '13:40', name: '忍野八海', type: 'sight',
          lat: 35.4603, lng: 138.8328, stay: 70, transit: '巴士 35 分钟',
          note: '水很清，拍富士山倒影的好位置。'
        },
        {
          time: '15:30', name: '山中湖', type: 'sight',
          lat: 35.4172, lng: 138.8722, stay: 60, transit: '巴士 25 分钟',
          note: '11 月有逆富士概率高，风小的清晨最好，退而求其次下午也行。'
        },
        {
          time: '17:00', name: '山中湖 → 新宿 巴士', type: 'transport',
          lat: 35.6896, lng: 139.7006, stay: 150, transit: '步行 3 分钟到站牌',
          note: '末班车一般 17~18 点，看好时间别错过。'
        },
        {
          time: '20:00', name: '新宿 晚餐', type: 'food',
          lat: 35.6910, lng: 139.7005, stay: 90, transit: '巴士到达',
          note: ''
        }
      ]
    },
    {
      date: '2026-11-19',
      title: '筑地 · 银座 · 台场',
      area: '中央区 / 港区',
      base: { lat: 35.6654, lng: 139.7707 },
      note: '最后完整的一天，留时间收拾行李。',
      items: [
        {
          time: '08:00', name: '筑地场外市场', type: 'food',
          lat: 35.6654, lng: 139.7707, stay: 90, transit: '地铁 25 分钟',
          note: '周三是休市日，注意确认；玉子烧和海鲜串边走边吃。'
        },
        {
          time: '10:00', name: '银座', type: 'shop',
          lat: 35.6717, lng: 139.7650, stay: 120, transit: '步行 15 分钟',
          note: '三越、松屋地下食品层很值得逛。'
        },
        {
          time: '12:30', name: '银座 午餐', type: 'food',
          lat: 35.6710, lng: 139.7640, stay: 60, transit: '步行 5 分钟',
          note: ''
        },
        {
          time: '14:00', name: '台场 富士电视台', type: 'sight',
          lat: 35.6266, lng: 139.7740, stay: 60, transit: '地铁 20 分钟',
          note: '25F 球体展望室免费，能看到彩虹桥。'
        },
        {
          time: '15:20', name: '台场海滨公园', type: 'sight',
          lat: 35.6300, lng: 139.7745, stay: 70, transit: '步行 10 分钟',
          note: '日落约 16:35，提前到占个长椅。'
        },
        {
          time: '17:00', name: '新宿 购物收尾', type: 'shop',
          lat: 35.6910, lng: 139.7005, stay: 120, transit: '百合鸥号 30 分钟',
          note: '药妆、伴手礼在唐吉诃德一站买完。'
        },
        {
          time: '19:30', name: '新宿 晚餐', type: 'food',
          lat: 35.6930, lng: 139.6995, stay: 90, transit: '步行 6 分钟',
          note: '最后一天吃烤肉或寿司。'
        }
      ]
    },
    {
      date: '2026-11-20',
      title: '返程',
      area: '成田',
      base: { lat: 35.7719, lng: 140.3929 },
      note: '国际航班建议提前 2.5 小时到；免税店够时间逛。',
      items: [
        {
          time: '08:30', name: '酒店退房', type: 'stay',
          lat: 35.6938, lng: 139.7034, stay: 40, transit: '',
          note: '行李寄存前台，或直接带去车站 locker。'
        },
        {
          time: '09:40', name: '新宿 → 成田 N\'EX', type: 'transport',
          lat: 35.7719, lng: 140.3929, stay: 85, transit: '步行 8 分钟',
          note: '11:05 到 T1，正好 2.5 小时缓冲。'
        },
        {
          time: '11:10', name: '成田 T1 免税店', type: 'shop',
          lat: 35.7719, lng: 140.3929, stay: 90, transit: '机场内步行',
          note: '11:30 办登机，14:30 起飞。'
        },
        {
          time: '12:40', name: '安检 → 登机口', type: 'transport',
          lat: 35.7719, lng: 140.3929, stay: 60, transit: '步行 10 分钟',
          note: ''
        }
      ]
    }
  ]
};
