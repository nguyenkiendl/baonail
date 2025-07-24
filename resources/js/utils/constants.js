import { Value } from "sass";

export const VERSION = '1.3.9';
export const USER_ROLE = [
    {
        value: "1",
        label: "SystemAdmin",
    },
    {
        value: "0",
        label: "Quest",
    }
];

export const IS_PHUC = [
    'hotel-md',
    'hotel-dl',
    'tour-vu',
    'combo-tour-vu',
    'tent',
    'combo-tent',
    'bbq',
];

export const WAREHOUSES = [
    {
        value: 'central',
        label: 'Kho Tổng'
    },
    {
        value: 'vu-rest',
        label: 'Nhà Hàng Việt Úc'
    },
    {
        value: 'vu-water',
        label: 'Nước Vườn Hoa'
    },
    {
        value: 'vu-room',
        label: 'Buồng Phòng Glamping'
    },
    {
        value: 'md-rest',
        label: 'Nhà Hàng Buffet Măng Đen'
    },
    {
        value: 'md-rest-cake',
        label: 'Nhà Hàng Bánh Ngọt Aurora'
    },
    {
        value: 'md-room',
        label: 'Buồng Phòng Măng Đen'
    },
    {
        value: 'dl-rest',
        label: 'Quầy live chào đón'
    },
    {
        value: 'dl-room',
        label: 'Buồng Phòng Đà Lạt'
    },
];

export const WAREHOUSES_GROUP = [
    {
        label: 'Việt Úc Flower Graden',
        options: [
            {
                value: 'vu-rest',
                label: 'Nhà Hàng Việt Úc'
            },
            {
                value: 'vu-water',
                label: 'Nước Vườn Hoa'
            },
            {
                value: 'vu-room',
                label: 'Buồng Phòng Glamping'
            },
        ],
    },
    {
        label: 'Aurora Măng Đen',
        options: [
            {
                value: 'md-rest',
                label: 'Nhà Hàng Buffet Măng Đen'
            },
            {
                value: 'md-rest-cake',
                label: 'Nhà Hàng Bánh Ngọt Aurora'
            },
            {
                value: 'md-room',
                label: 'Buồng Phòng Măng Đen'
            },
        ],
    },
    {
        label: 'Aurora Đà Lạt',
        options: [
            {
                value: 'dl-rest',
                label: 'Quầy live chào đón'
            },
            {
                value: 'dl-room',
                label: 'Buồng Phòng Đà Lạt'
            },
        ],
    },
];

export const STOCK_STATUS = [
    {
        value: 'in',
        label: 'Nhập Kho'
    },
    {
        value: 'out',
        label: 'Xuất Kho'
    }
]

export const STEP_CAR_OPTIONS = [
    {
        value: 0,
        label: 'Khác'
    },
    {
        value: 1,
        label: 'Tạm Ứng'
    },
    {
        value: 2,
        label: 'Quyết Toán'
    },
]

export const SERVICE_TYPES = [
    {
        value: 'hotel-md',
        label: 'Aurora Măng Đen',
        warehouse: 'md-rest'
    },
    {
        value: 'hotel-dl',
        label: 'Aurora Đà Lạt',
        warehouse: 'dl-rest'
    },
    {
        value: 'tourist-car-md',
        label: 'Xe Du Lịch Măng Đen',
        warehouse: ''
    },
    {
        value: 'motobike-md',
        label: 'Xe Máy Măng Đen',
        warehouse: ''
    },
    {
        value: 'tourist-car-vu',
        label: 'Xe Du Lịch Việt Úc',
        warehouse: ''
    },
    {
        value: 'tour-vu',
        label: 'Tour Du Lịch Việt Úc',
        warehouse: ''
    },
    {
        value: 'combo-tour-vu',
        label: 'Combo Du Lịch Việt Úc',
        warehouse: ''
    },
    {
        value: 'tent',
        label: 'Lều',
        warehouse: ''
    },
    {
        value: 'combo-tent',
        label: 'Combo Lều',
        warehouse: ''
    },
    {
        value: 'bbq',
        label: 'BBQ',
        warehouse: 'vu-rest'
    },
    {
        value: 'pleasure-boat',
        label: 'Du Thuyền',
        warehouse: ''
    },
    {
        value: 'water-flowergarden',
        label: 'Nước Vườn Hoa',
        warehouse: ''
    },
    {
        value: 'ticket-flowergarden',
        label: 'Vé Vườn Hoa',
        warehouse: ''
    }
];

export const SERVICE_ARRAY = [
    {
        value: 'Thuê xe máy số',
        label: 'Thuê xe máy số',
    },
    {
        value: 'Thuê xe tay ga',
        label: 'Thuê xe tay ga',
    },
    {
        value: 'BBQ',
        label: 'BBQ',
    },
    {
        value: 'Thuê xe ô tô',
        label: 'Thuê xe ô tô'
    },
    {
        value: 'Đón sân bay',
        label: 'Đón sân bay',
    },
    {
        value: 'Đưa sân bay',
        label: 'Đưa sân bay',
    },
];

export const CAR_ARRAY = [
    {
        value: '4',
        label: '4 chỗ',
    },
    {
        value: '7',
        label: '7 chỗ',
    },
    {
        value: '16',
        label: '16 chỗ',
    },
    {
        value: '29',
        label: '29 chỗ',
    },
    {
        value: '45',
        label: '45 chỗ',
    },
];

export const ORDER_STATUS = [
    {
        value: 0,
        label: 'Đang xử lý'
    },
    {
        value: 1,
        label: 'Hoàn thành'
    },
    {
        value: 2,
        label: 'Bảo lưu'
    }
];

export const ADMINS = ['superadmin', 'adminapproval', 'admin'];

export const SUPERADMINS = ['superadmin', 'adminapproval'];

export const AGENCY_OPTIONS = [
    {
        value: 'Aurora Hotel Măng Đen',
        label: 'Aurora Hotel Măng Đen'
    },
    {
        value: 'Aurora Hotel Đà lạt',
        label: 'Aurora Hotel Đà lạt'
    },
    {
        value: 'Việt Úc Flower Graden',
        label: 'Việt Úc Flower Graden'
    },
    {
        value: 'Việt Úc Tourist',
        label: 'Việt Úc Tourist'
    },
];

export const SALE_TYPES = [
    {
        value: 'percent',
        label: '%'
    },
    {
        value: 'vnd',
        label: 'VND'
    },
];

export const SALE_OPTIONS = [
    {
        value: 'Khách đến trực tiếp',
        label: 'Khách đến trực tiếp'
    },
    {
        value: 'Hotline 0907891414',
        label: 'Hotline 0907891414'
    },
    {
        value: 'Aurora 0260 3848666',
        label: 'Aurora 0260 3848666'
    },
    {
        value: 'Fanpage Aurora Hotel Măng Đen',
        label: 'Fanpage Aurora Hotel Măng Đen'
    },
    {
        value: 'Fanpage Việt Úc Flower Graden',
        label: 'Fanpage Việt Úc Flower Graden'
    },
    {
        value: 'Khách Booking',
        label: 'Khách Booking'
    },
    {
        value: 'Khách Agoda',
        label: 'Khách Agoda'
    },
    {
        value: 'Khách Traveloka',
        label: 'Khách Traveloka'
    },
    {
        value: 'Khách Trip Ebooking',
        label: 'Khách Trip Ebooking'
    },
    {
        value: 'Khách Airbnb',
        label: 'Khách Airbnb'
    },
    {
        value: 'TÀI XẾ ĐỐI TÁC',
        label: 'TÀI XẾ ĐỐI TÁC'
    },
];

export const MD_ROOMS = [
    {
        number: '101',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '102',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '103',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '104',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '201',
        type: 'TWIN',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: '202',
        type: 'DOUBLE',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: '203',
        type: 'TWIN',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: '204',
        type: 'DOUBLE',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: '301',
        type: 'DOUBLE',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '302',
        type: 'DOUBLE',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '303',
        type: 'TWIN',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '304',
        type: 'DOUBLE',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '305',
        type: 'TWIN',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '306',
        type: 'TWIN',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '307',
        type: 'DOUBLE',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '308',
        type: 'DOUBLE',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '401',
        type: 'DOUBLE',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '402',
        type: 'DOUBLE',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '403',
        type: 'TWIN',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '404',
        type: 'DOUBLE',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '405',
        type: 'TWIN',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '406',
        type: 'TWIN',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '407',
        type: 'DOUBLE',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '408',
        type: 'DOUBLE',
        category: 'SUITE',
        quantity: 2
    },
];

export const DL_ROOMS = [
    {
        number: 'B201',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: 'B202',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: 'B203',
        type: 'TWIN',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: 'B101',
        type: 'DOUBLE',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: 'B102',
        type: 'TWIN',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: 'B103',
        type: 'TWIN',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: 'VIPB104',
        type: 'DOUBLE',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: 'VIPB105',
        type: 'TWIN',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: '101',
        type: 'DOUBLE',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '102',
        type: 'DOUBLE',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '103',
        type: 'TWIN',
        category: 'DULUXE',
        quantity: 2
    },
    {
        number: '201',
        type: 'TWIN',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '202',
        type: 'DOUBLE',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '203',
        type: 'DOUBLE',
        category: 'SUITE',
        quantity: 2
    },
    {
        number: '204',
        type: 'TWIN',
        category: 'SUITE',
        quantity: 2
    },
];

export const MD_TENTS = [
    {
        number: '101',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '102',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '103',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '104',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '105',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '106',
        type: 'DOUBLE',
        category: 'STANDARD',
        quantity: 2
    },
    {
        number: '301',
        type: 'DOUBLE',
        category: 'SUPERIOR',
        quantity: 2
    },
    {
        number: '302',
        type: 'DOUBLE',
        category: 'SUPERIOR',
        quantity: 2
    },
];

export const BRANCH = [
    {
        value: 'hotel-md',
        label: 'KS. Măng Đen'
    },
    {
        value: 'hotel-dl',
        label: 'KS. Đà Lạt'
    },
    {
        value: 'tent',
        label: 'Glamping'
    }
];

export const ROOM_TYPES = [
    {
        value: 'double',
        label: 'DOUBLE'
    },
    {
        value: 'twin',
        label: 'TWIN'
    }
];

export const SETUPCHECKIN_DOUBLE = [
    {
        title: 'I.Phần vệ sinh phòng',
        datas: [
            {
                name: 'Lau sàn phòng',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau ban công',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau sàn WC',
                active: true,
                quantity: 0,
            },
            {
                name: 'Hút bụi',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau cửa kiếng, bàn ghế',
                active: true,
                quantity: 0,
            }
        ]
    },
    {
        title: 'II. Phần thay vật dụng',
        datas: [
            {
                name: 'Thay bảo vệ nệm',
                active: true,
                quantity: 0,
            },
            {
                name: 'Thay vỏ chăn',
                active: true,
                quantity: 0,
            },
            {
                name: 'Thay vỏ gối',
                active: true,
                quantity: 0,
            },
            {
                name: 'Thay ga',
                active: true,
                quantity: 0,
            }
        ]
    },
    {
        title: 'III. Phần setup vật dụng',
        datas: [
            {
                name: 'Khăn',
                active: true,
                quantity: 7,
            },
            {
                name: 'Dầu gội',
                active: true,
                quantity: 1,
            },
            {
                name: 'Dầu xả',
                active: true,
                quantity: 1,
            },
            {
                name: 'Sữa tắm',
                active: true,
                quantity: 1,
            },
            {
                name: 'Nước rửa tay',
                active: true,
                quantity: 1,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Lược',
                active: true,
                quantity: 1,
            },
            {
                name: 'Hộp giấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Văn phòng phẩm',
                active: true,
                quantity: 1,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 2,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 2,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: true,
                quantity: 1,
            },
        ]
    },
    {
        title: 'IV. Mini bar',
        datas: [
            {
                name: 'Coca',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
            {
                name: '7 up',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bia tiger',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bò húc',
                active: true,
                quantity: 2,
            }
        ]
    },
];

export const SETUPCHECKON_DOUBLE = [
    {
        title: 'I.Phần vệ sinh phòng',
        datas: [
            {
                name: 'Lau sàn phòng',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau ban công',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau sàn WC',
                active: true,
                quantity: 0,
            },
            {
                name: 'Hút bụi',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau cửa kiếng, bàn ghế',
                active: true,
                quantity: 0,
            }
        ]
    },
    {
        title: 'II. Phần setup vật dụng',
        datas: [
            {
                name: 'Khăn',
                active: true,
                quantity: 7,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Lược',
                active: true,
                quantity: 1,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 2,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
        ]
    },
];

export const SETUPCHECKOUT_DOUBLE = [
    {
        title: 'I.Phần vật dụng',
        datas: [
            {
                name: 'Bảo vệ nệm',
                active: true,
                quantity: 1,
            },
            {
                name: 'Vỏ chăn',
                active: true,
                quantity: 1,
            },
            {
                name: 'Vỏ gối',
                active: true,
                quantity: 3,
            },
            {
                name: 'Ga',
                active: true,
                quantity: 1,
            },
            {
                name: 'Khăn',
                active: true,
                quantity: 7,
            },
            {
                name: 'Dầu gội',
                active: true,
                quantity: 1,
            },
            {
                name: 'Dầu xả',
                active: true,
                quantity: 1,
            },
            {
                name: 'Sữa tắm',
                active: true,
                quantity: 1,
            },
            {
                name: 'Nước rửa tay',
                active: true,
                quantity: 1,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Lược',
                active: false,
                quantity: 0,
            },
            {
                name: 'Dao cạo râu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Chùm đầu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Bông tăm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Ly đánh răng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 2,
            },
            {
                name: 'Áo choàng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Tách cà phê',
                active: true,
                quantity: 2,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 2,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 2,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 2,
            },
            {
                name: 'Đường',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 1,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: true,
                quantity: 1,
            },
        ]
    },
    {
        title: 'II. Mini Bar',
        datas: [
            {
                name: 'Coca',
                active: true,
                quantity: 2,
            },
            {
                name: '7 Up',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bia tiger',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bò húc',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
        ]
    }
];

export const SETUPCHECKIN_TWIN = [
    {
        title: 'I.Phần vệ sinh phòng',
        datas: [
            {
                name: 'Lau sàn phòng',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau ban công',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau sàn WC',
                active: true,
                quantity: 0,
            },
            {
                name: 'Hút bụi',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau cửa kiếng, bàn ghế',
                active: true,
                quantity: 0,
            }
        ]
    },
    {
        title: 'II. Phần thay vật dụng',
        datas: [
            {
                name: 'Thay bảo vệ nệm',
                active: true,
                quantity: 0,
            },
            {
                name: 'Thay vỏ chăn',
                active: true,
                quantity: 0,
            },
            {
                name: 'Thay vỏ gối',
                active: true,
                quantity: 0,
            },
            {
                name: 'Thay ga',
                active: true,
                quantity: 0,
            }
        ]
    },
    {
        title: 'III. Phần setup vật dụng',
        datas: [
            {
                name: 'Khăn',
                active: true,
                quantity: 10,
            },
            {
                name: 'Dầu gội',
                active: true,
                quantity: 1,
            },
            {
                name: 'Dầu xả',
                active: true,
                quantity: 1,
            },
            {
                name: 'Sữa tắm',
                active: true,
                quantity: 1,
            },
            {
                name: 'Nước rửa tay',
                active: true,
                quantity: 1,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: true,
                quantity: 3,
            },
            {
                name: 'Lược',
                active: true,
                quantity: 1,
            },
            {
                name: 'Hộp giấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Văn phòng phẩm',
                active: true,
                quantity: 1,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 3,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 3,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 3,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 3,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: true,
                quantity: 1,
            },
        ]
    },
    {
        title: 'IV. Mini bar',
        datas: [
            {
                name: 'Coca',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
            {
                name: '7 up',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bia tiger',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bò húc',
                active: true,
                quantity: 2,
            }
        ]
    },
];

export const SETUPCHECKON_TWIN = [
    {
        title: 'I.Phần vệ sinh phòng',
        datas: [
            {
                name: 'Lau sàn phòng',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau ban công',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau sàn WC',
                active: true,
                quantity: 0,
            },
            {
                name: 'Hút bụi',
                active: true,
                quantity: 0,
            },
            {
                name: 'Lau cửa kiếng, bàn ghế',
                active: true,
                quantity: 0,
            }
        ]
    },
    {
        title: 'II. Phần setup vật dụng',
        datas: [
            {
                name: 'Khăn',
                active: true,
                quantity: 10,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: true,
                quantity: 3,
            },
            {
                name: 'Lược',
                active: true,
                quantity: 1,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 3,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 3,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 3,
            },
        ]
    },
];

export const SETUPCHECKOUT_TWIN = [
    {
        title: 'I.Phần vật dụng',
        datas: [
            {
                name: 'Bảo vệ nệm',
                active: true,
                quantity: 2,
            },
            {
                name: 'Vỏ chăn',
                active: true,
                quantity: 2,
            },
            {
                name: 'Vỏ gối',
                active: true,
                quantity: 5,
            },
            {
                name: 'Ga',
                active: true,
                quantity: 2,
            },
            {
                name: 'Khăn',
                active: true,
                quantity: 10,
            },
            {
                name: 'Dầu gội',
                active: true,
                quantity: 1,
            },
            {
                name: 'Dầu xả',
                active: true,
                quantity: 1,
            },
            {
                name: 'Sữa tắm',
                active: true,
                quantity: 1,
            },
            {
                name: 'Nước rửa tay',
                active: true,
                quantity: 1,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Lược',
                active: false,
                quantity: 0,
            },
            {
                name: 'Dao cạo râu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Chùm đầu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Bông tăm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Ly đánh răng',
                active: true,
                quantity: 3,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 3,
            },
            {
                name: 'Áo choàng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Tách cà phê',
                active: true,
                quantity: 3,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 3,
            },
            {
                name: 'Cafe',
                active: false,
                quantity: 0,
            },
            {
                name: 'Trà',
                active: false,
                quantity: 0,
            },
            {
                name: 'Đường',
                active: false,
                quantity: 0,
            },
            {
                name: 'Nước suối',
                active: false,
                quantity: 0,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: true,
                quantity: 1,
            },
        ]
    },
    {
        title: 'II. Mini Bar',
        datas: [
            {
                name: 'Coca',
                active: true,
                quantity: 2,
            },
            {
                name: '7 Up',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bia tiger',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bò húc',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
        ]
    }
];

export const SETUPCHECKIN_TENT = [
    {
        title: 'I.Phần vệ sinh phòng',
        datas: [
            {
                name: 'Lau sàn phòng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Hút bụi',
                active: false,
                quantity: 0,
            },
            {
                name: 'Lau cửa kiếng, bàn ghế',
                active: false,
                quantity: 0,
            }
        ]
    },
    {
        title: 'II. Phần thay vật dụng',
        datas: [
            {
                name: 'Thay bảo vệ nệm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Thay vỏ chăn',
                active: true,
                quantity: 2,
            },
            {
                name: 'Thay vỏ gối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Khăn',
                active: true,
                quantity: 7,
            },
            {
                name: 'Thay ga',
                active: true,
                quantity: 2,
            }
        ]
    },
    {
        title: 'III. Phần setup vật dụng',
        datas: [
            {
                name: 'Dầu gội',
                active: true,
                quantity: 2,
            },
            {
                name: 'Dầu xả',
                active: true,
                quantity: 2,
            },
            {
                name: 'Sữa tắm',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 2,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 2,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 2,
            },
            {
                name: 'Đường',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: false,
                quantity: 0,
            },
        ]
    },
];

export const SETUPCHECKOUT_TENT = [
    {
        title: 'I.Phần vật dụng',
        datas: [
            {
                name: 'Bảo vệ nệm',
                active: true,
                quantity: 2,
            },
            {
                name: 'Vỏ chăn',
                active: true,
                quantity: 2,
            },
            {
                name: 'Vỏ gối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Ga',
                active: true,
                quantity: 2,
            },
            {
                name: 'Khăn',
                active: true,
                quantity: 7,
            },
            {
                name: 'Dầu gội',
                active: false,
                quantity: 0,
            },
            {
                name: 'Dầu xả',
                active: false,
                quantity: 0,
            },
            {
                name: 'Sữa tắm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Nước rửa tay',
                active: false,
                quantity: 0,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Lược',
                active: false,
                quantity: 0,
            },
            {
                name: 'Dao cạo râu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Chùm đầu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Bông tăm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Ly đánh răng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 2,
            },
            {
                name: 'Áo choàng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Tách cà phê',
                active: true,
                quantity: 2,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 2,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 2,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 2,
            },
            {
                name: 'Đường',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: false,
                quantity: 0,
            },
        ]
    }
];

export const SETUPCHECKIN_TENTVIP = [
    {
        title: 'I.Phần vệ sinh phòng',
        datas: [
            {
                name: 'Lau sàn phòng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Hút bụi',
                active: false,
                quantity: 0,
            },
            {
                name: 'Lau cửa kiếng, bàn ghế',
                active: false,
                quantity: 0,
            }
        ]
    },
    {
        title: 'II. Phần thay vật dụng',
        datas: [
            {
                name: 'Thay bảo vệ nệm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Thay vỏ chăn',
                active: true,
                quantity: 2,
            },
            {
                name: 'Thay vỏ gối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Khăn',
                active: true,
                quantity: 7,
            },
            {
                name: 'Thay ga',
                active: true,
                quantity: 2,
            }
        ]
    },
    {
        title: 'III. Phần setup vật dụng',
        datas: [
            {
                name: 'Dầu gội',
                active: true,
                quantity: 2,
            },
            {
                name: 'Dầu xả',
                active: true,
                quantity: 2,
            },
            {
                name: 'Sữa tắm',
                active: true,
                quantity: 2,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 2,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 2,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 2,
            },
            {
                name: 'Đường',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: true,
                quantity: 1,
            },
        ]
    },
];

export const SETUPCHECKOUT_TENTVIP = [
    {
        title: 'I.Phần vật dụng',
        datas: [
            {
                name: 'Bảo vệ nệm',
                active: true,
                quantity: 2,
            },
            {
                name: 'Vỏ chăn',
                active: true,
                quantity: 2,
            },
            {
                name: 'Vỏ gối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Ga',
                active: true,
                quantity: 2,
            },
            {
                name: 'Khăn',
                active: true,
                quantity: 7,
            },
            {
                name: 'Dầu gội',
                active: false,
                quantity: 0,
            },
            {
                name: 'Dầu xả',
                active: false,
                quantity: 0,
            },
            {
                name: 'Sữa tắm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Nước rửa tay',
                active: false,
                quantity: 0,
            },
            {
                name: 'Bàn chải đánh răng + Kem đánh răng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Lược',
                active: false,
                quantity: 0,
            },
            {
                name: 'Dao cạo râu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Chùm đầu',
                active: false,
                quantity: 0,
            },
            {
                name: 'Bông tăm',
                active: false,
                quantity: 0,
            },
            {
                name: 'Ly đánh răng',
                active: true,
                quantity: 2,
            },
            {
                name: 'Dép',
                active: true,
                quantity: 2,
            },
            {
                name: 'Áo choàng',
                active: false,
                quantity: 0,
            },
            {
                name: 'Máy sấy',
                active: true,
                quantity: 1,
            },
            {
                name: 'Tách cà phê',
                active: true,
                quantity: 2,
            },
            {
                name: 'Mì',
                active: true,
                quantity: 2,
            },
            {
                name: 'Cafe',
                active: true,
                quantity: 2,
            },
            {
                name: 'Trà',
                active: true,
                quantity: 2,
            },
            {
                name: 'Đường',
                active: true,
                quantity: 2,
            },
            {
                name: 'Nước suối',
                active: true,
                quantity: 2,
            },
            {
                name: 'Máy đun sôi',
                active: true,
                quantity: 1,
            },
            {
                name: 'Thúng trái cây',
                active: true,
                quantity: 1,
            },
        ]
    }
];

export const ROOMSTEPS = [
    {
        value: 1,
        label: 'Setup',
        labelSuccess: 'Đã Setup',
        role: 'housekeeping'
    },
    {
        value: 2,
        label: 'Kiểm Tra',
        labelSuccess: 'Đã Kiểm Tra',
        role: 'housechecking'
    },
    {
        value: 3,
        label: 'Chỉnh Trang',
        labelSuccess: 'Đã Chỉnh Trang',
        role: 'housekeeping'
    },
    {
        value: 4,
        label: 'Phát Sinh',
        labelSuccess: 'Có Phát Sinh',
        role: 'housekeeping'
    },
    {
        value: 5,
        label: 'Check Out',
        labelSuccess: 'Đã Check Out',
        role: 'housekeeping'
    },
];

export const SETUPTYPES = [
    {
        value: 'CHECK IN',
        label: 'NHẬN PHÒNG',
    },
    {
        value: 'CHECK ON',
        label: 'CHỈNH TRANG',
    },
    {
        value: 'CHECK OUT',
        label: 'TRẢ PHÒNG',
    },
];

export const COLORS = [
    "#FF5733", "#009688", "#3357FF", "#dd1983", "#cdae33",
    "#FF8C00", "#dd1180", "#6957d5", "#1f971f", "#b39702",
    "#60209b", "#A52A2A", "#457d7f", "#D2691E", "#c5442d",
    "#a59e5d", "#5b975b", "#757575", "#446aad", "#d53a01"
];

export const TYPE_ALOWS = ['hotel-md', 'hotel-dl', 'bbq', 'tent', 'combo-tent', 'water-flowergarden', 'ticket-flowergarden'];

export const PAYONE_OPTIONS = [
    'Nhận thanh toán cọc 50%',
    'Nhận thanh toán 100%',
    'Nhận thanh toán tạm ứng'
];

export const PAYTWO_OPTIONS = [
    'Nhận thanh toán phát sinh dịch vụ',
    'Nhận thanh toán cuối cùng'
];

export const PAYTHREE_OPTIONS = [
    'Nhận thanh toán cuối cùng'
];

export const IS_HOTEL = ['hotel-md', 'hotel-dl'];

export const VAT = 8 / 100;
export const BIAVAT = 10 / 100;

export const IS_CARRENTAL = ['tourist-car-vu', 'tourist-car-md', 'motobike-md'];

export const MAIN_BRANCH = [
    {
        value: 'farm-vu',
        label: 'Việt Úc Flower Graden'
    },
    {
        value: 'hotel-md',
        label: 'Aurora Hotel Măng Đen'
    },
    {
        value: 'hotel-dl',
        label: 'Aurora Hotel Đà Lạt'
    }
];

export const UTENSIL_STATUS = [
    {
        value: 0,
        label: 'Chưa duyệt'
    },
    {
        value: 1,
        label: 'Đã duyệt'
    },
];

export const BATCH_OPTIONS = [
    {
        value: 'active',
        label: 'OK'
    },
    {
        value: 'empty',
        label: 'Hết Hàng'
    }
];