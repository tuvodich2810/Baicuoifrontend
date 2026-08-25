// ==========================================================================
// ĐỒ ÁN FRONTEND: XỬ LÝ TÍNH NĂNG TƯƠNG TÁC SHOWROOM MERCEDES-BENZ
// File: script.js
// Nhóm sinh viên thực hiện:
//   1. Nguyễn Văn Tuấn (Trưởng nhóm - Frontend UI/UX & Styling Lead)
//   2. Trần Minh Thuận (Thành viên - Frontend Logic & Testing Lead)
//
// Các tính năng chính:
//   1. Cơ sở dữ liệu 10 dòng xe Mercedes-Benz chính hãng (Dataset)
//   2. Hiển thị động danh sách thẻ xe (Dynamic Rendering)
//   3. Lọc xe theo phân khúc (Sedan, SUV, Thuần Điện EQ, AMG Hiệu Năng Cao)
//   4. Tìm kiếm tức thì theo từ khóa theo thời gian thực (Live Search)
//   5. Sắp xếp danh sách xe theo giá bán và công suất mã lực
//   6. Hộp thoại xem chi tiết thông số kỹ thuật (Modal Popup)
//   7. Tự động chọn xe và cuộn mượt xuống Form đăng ký (Auto-fill Form)
//   8. Xử lý đặt lịch hẹn theo từng đại lý Showroom ủy quyền
//   9. Xử lý gửi Form với hệ thống thông báo Toast Notification hiện đại
//   10. Hiệu ứng cuộn trang, thanh điều hướng Header & Nút Back-to-top
// ==========================================================================

// ==========================================================================
// 1. CƠ SỞ DỮ LIỆU CÁC DÒNG XE MERCEDES-BENZ CHÍNH HÃNG (DATASET)
// ==========================================================================
const mercedesCars = [
    {
        id: "c300",
        name: "Mercedes-Benz C 300 AMG",
        category: "Sedan",
        badge: "Bán Chạy Nhất",
        badgeClass: "badge-sedan",
        price: 2099000000,
        formattedPrice: "2.099.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
        desc: "Thiết kế thể thao AMG Line trẻ trung, động cơ 2.0L thế hệ mới tích hợp công nghệ Mild Hybrid EQ Boost mạnh mẽ và êm ái.",
        power: 258,
        powerText: "258 hp",
        acceleration: "6.0s",
        engine: "2.0L Turbo + EQ Boost",
        transmission: "9G-TRONIC / RWD",
        fuelEco: "7.4L / 100km",
        features: [
            "Hệ thống đèn pha thông minh DIGITAL LIGHT thế hệ mới",
            "Màn hình cảm ứng trung tâm 11.9 inch hướng về người lái",
            "Gói ngoại thất & nội thất thể thao AMG Line cao cấp",
            "Dàn âm thanh vòm Burmester® 3D 15 loa sống động"
        ]
    },
    {
        id: "e300",
        name: "Mercedes-Benz E 300 AMG",
        category: "Sedan",
        badge: "Doanh Nhân",
        badgeClass: "badge-sedan",
        price: 3209000000,
        formattedPrice: "3.209.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=800&q=80",
        desc: "Biểu tượng thành đạt của các doanh nhân. Khoang lái sang trọng tuyệt đối cùng khả năng cách âm và vận hành đỉnh cao.",
        power: 258,
        powerText: "258 hp",
        acceleration: "6.2s",
        engine: "2.0L Turbo I4",
        transmission: "9G-TRONIC / RWD",
        fuelEco: "7.9L / 100km",
        features: [
            "Hệ thống treo thích ứng AGILITY CONTROL êm ái",
            "Cửa sổ trời siêu rộng Panorama chỉnh điện",
            "Vô-lăng thể thao bọc da Nappa D-Cut thể thao",
            "Hệ thống tạo mùi hương AIR-BALANCE ion hóa cao cấp"
        ]
    },
    {
        id: "s450",
        name: "Mercedes-Benz S 450 4MATIC",
        category: "Sedan",
        badge: "Đẳng Cấp Chủ Tịch",
        badgeClass: "badge-sedan",
        price: 5039000000,
        formattedPrice: "5.039.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        desc: "Dòng Sedan đầu bảng tinh hoa hội tụ. Hàng ghế sau thương gia chuẩn khoang hạng nhất với tính năng massage đá nóng.",
        power: 367,
        powerText: "367 hp",
        acceleration: "5.1s",
        engine: "3.0L Turbo I6 + EQ Boost",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "8.3L / 100km",
        features: [
            "Hệ thống treo khí nén thông minh AIRMATIC tự nâng hạ gầm",
            "Hàng ghế sau chuẩn thương gia tích hợp đệm bắp chân & massage",
            "Màn hình trung tâm OLED 12.8 inch sắc nét tuyệt đối",
            "Tay nắm cửa ẩn tự động thò thụt mở ra khi chìa khóa tới gần"
        ]
    },
    {
        id: "maybach-s680",
        name: "Mercedes-Maybach S 680 4MATIC",
        category: "Sedan",
        badge: "Đỉnh Cao Maybach",
        badgeClass: "badge-maybach",
        price: 15990000000,
        formattedPrice: "15.990.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
        desc: "Đỉnh cao tuyệt đối của sự xa xỉ. Động cơ V12 6.0L Biturbo danh giá kết hợp màu sơn hai tone màu thủ công Maybach độc bản.",
        power: 612,
        powerText: "612 hp",
        acceleration: "4.5s",
        engine: "6.0L V12 Biturbo Handcrafted",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "14.2L / 100km",
        features: [
            "Màu sơn 2 tông màu ngoại thất Maybach chế tác thủ công",
            "Dàn âm thanh vòm High-End 4D Burmester® 31 loa 1.750W",
            "Tủ lạnh mini phía sau cùng bộ ly uống champagne mạ bạc",
            "Cửa sau đóng mở tự động hoàn toàn bằng cử chỉ tay"
        ]
    },
    {
        id: "glc300",
        name: "Mercedes-Benz GLC 300 4MATIC",
        category: "SUV",
        badge: "SUV Sang Bán Chạy",
        badgeClass: "badge-suv",
        price: 2799000000,
        formattedPrice: "2.799.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80",
        desc: "Mẫu SUV hạng sang thế hệ mới với khả năng vượt địa hình xuất sắc, nắp ca-pô trong suốt và gói thiết kế thể thao AMG Dynamic.",
        power: 258,
        powerText: "258 hp",
        acceleration: "6.2s",
        engine: "2.0L Turbo Mild Hybrid",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "7.8L / 100km",
        features: [
            "Công nghệ nắp ca-pô trong suốt (Transparent Bonnet) quan sát gầm",
            "Hệ thống dẫn động 4 bánh toàn thời gian 4MATIC vượt mọi cung đường",
            "Gói ngoại thất AMG thể thao với mâm hợp kim 20 inch đa chấu",
            "Hệ thống đèn viền nội thất Ambient Light 64 màu tùy chỉnh"
        ]
    },
    {
        id: "gls450",
        name: "Mercedes-Benz GLS 450 4MATIC",
        category: "SUV",
        badge: "S-Class Của Dòng SUV",
        badgeClass: "badge-suv",
        price: 5389000000,
        formattedPrice: "5.389.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
        desc: "SUV 7 chỗ cỡ lớn hạng sang (Full-size Luxury SUV). Không gian rộng lớn, quyền lực và cực kỳ tiện nghi cho cả gia đình.",
        power: 381,
        powerText: "381 hp",
        acceleration: "6.1s",
        engine: "3.0L I6 Turbo + EQ Boost",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "9.2L / 100km",
        features: [
            "Không gian 7 chỗ ngồi thực thụ rộng rãi cho cả 3 hàng ghế",
            "Hệ thống treo khí nén thích ứng thông minh AIRMATIC",
            "Hệ thống giải trí MBUX High-End dành riêng cho hàng ghế sau",
            "Cửa sổ trời toàn cảnh Panorama và cửa hít tự động êm ái"
        ]
    },
    {
        id: "g63",
        name: "Mercedes-AMG G 63 (Vua Địa Hình)",
        category: "AMG",
        badge: "Huyền Thoại G-Class",
        badgeClass: "badge-amg",
        price: 11750000000,
        formattedPrice: "11.750.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80",
        desc: "Biểu tượng xe địa hình quyền lực thế giới. Động cơ V8 4.0L Biturbo thủ công cùng âm thanh ống xả thể thao AMG gầm vang uy lực.",
        power: 585,
        powerText: "585 hp",
        acceleration: "4.5s",
        engine: "4.0L V8 Biturbo AMG Handcrafted",
        transmission: "AMG SPEEDSHIFT TCT 9G",
        fuelEco: "13.1L / 100km",
        features: [
            "Hệ thống 3 khóa vi sai độc lập chinh phục mọi loại địa hình cực hạn",
            "Cụm ống xả kép thể thao AMG đặt bên hông thân xe độc bản",
            "Nội thất da Nappa Designo thủ công và chi tiết ốp Carbon",
            "Khung gầm hình thang thép siêu cường chịu lực vượt trội"
        ]
    },
    {
        id: "eqs580",
        name: "Mercedes-EQ EQS 580 4MATIC",
        category: "EQ",
        badge: "100% Thuần Điện",
        badgeClass: "badge-eq",
        price: 5959000000,
        formattedPrice: "5.959.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        desc: "Sedan thuần điện tương lai đầu bảng. Hệ số cản gió thấp nhất thế giới Cd 0.20 cùng màn hình siêu khủng MBUX Hyperscreen 56 inch.",
        power: 516,
        powerText: "516 hp",
        acceleration: "4.3s",
        engine: "Dual Motor Điện Kép 800V",
        transmission: "Hộp số điện đơn cấp",
        fuelEco: "770 km / 1 lần sạc",
        features: [
            "Màn hình vô cực MBUX Hyperscreen 56 inch trải dài mặt táp-lô",
            "Quãng đường di chuyển ấn tượng lên tới 770 km (chuẩn WLTP)",
            "Đánh lái bánh sau lên đến 10 độ giúp xe quay đầu cực kỳ linh hoạt",
            "Hệ thống lọc không khí HEPA diệt khuẩn và khử bụi mịn 99.65%"
        ]
    },
    {
        id: "eqe500",
        name: "Mercedes-EQ EQE 500 4MATIC SUV",
        category: "EQ",
        badge: "SUV Thuần Điện",
        badgeClass: "badge-eq",
        price: 3999000000,
        formattedPrice: "3.999.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
        desc: "SUV thuần điện đa dụng hạng sang. Tích hợp sạc nhanh DC 10-80% chỉ trong 31 phút cùng khả năng vận hành không tiếng ồn.",
        power: 408,
        powerText: "408 hp",
        acceleration: "4.9s",
        engine: "Dual Electric Motor",
        transmission: "Hộp số điện thông minh",
        fuelEco: "550 km / 1 lần sạc",
        features: [
            "Hệ dẫn động 4 bánh điện tử thông minh phân bổ lực kéo tức thì",
            "Hệ thống định vị dẫn đường thông minh Electric Intelligence",
            "Gói công nghệ hỗ trợ lái xe Driving Assistance Package Plus",
            "Khả năng sạc siêu nhanh DC từ 10% đến 80% chỉ trong 31 phút"
        ]
    },
    {
        id: "amg-gt",
        name: "Mercedes-AMG GT Coupe",
        category: "AMG",
        badge: "Siêu Xe Thể Thao",
        badgeClass: "badge-amg",
        price: 6899000000,
        formattedPrice: "6.899.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
        desc: "Cỗ máy tốc độ đỉnh cao của Mercedes-AMG. Thiết kế khí động học chủ động, tăng tốc 0-100 km/h chỉ vỏn vẹn trong 3.2 giây.",
        power: 585,
        powerText: "585 hp",
        acceleration: "3.2s",
        engine: "4.0L V8 Biturbo AMG One-Man",
        transmission: "AMG SPEEDSHIFT MCT 9G",
        fuelEco: "315 km/h Tốc độ tối đa",
        features: [
            "Tăng tốc từ 0 lên 100 km/h chỉ vỏn vẹn trong 3.2 giây",
            "Cánh gió sau chủ động điều chỉnh theo tốc độ và chế độ lái",
            "Hệ thống phanh gốm hiệu năng cao AMG Carbon Ceramic",
            "Vi sai chống trượt điện tử cầu sau AMG Electronic Rear-Axle"
        ]
    }
];

// Biến lưu trạng thái lọc và tìm kiếm hiện tại
let currentCategory = "all";
let currentSearchKeyword = "";
let currentSortOrder = "default";

// ==========================================================================
// 2. KHỞI CHẠY KHI TRANG TẢI XONG (DOM CONTENT LOADED)
// ==========================================================================
document.addEventListener("DOMContentLoaded", function() {
    // 1. Hiển thị danh sách xe ban đầu
    renderCars(mercedesCars);

    // 2. Bắt sự kiện cuộn trang để đổi màu Header, hiện nút Back-to-top và Scroll Spy
    initScrollEvents();
});

// ==========================================================================
// 3. HÀM HIỂN THỊ DANH SÁCH XE (DYNAMIC RENDERING)
// ==========================================================================
function renderCars(carList) {
    const carListContainer = document.getElementById("car-list");
    const noResults = document.getElementById("no-results");
    const visibleCount = document.getElementById("visible-count");

    if (!carListContainer) return;

    // Xóa nội dung cũ
    carListContainer.innerHTML = "";

    // Cập nhật số lượng xe hiển thị
    if (visibleCount) {
        visibleCount.innerText = carList.length;
    }

    // Kiểm tra nếu không có xe nào phù hợp với bộ lọc
    if (carList.length === 0) {
        if (noResults) noResults.style.display = "block";
        return;
    } else {
        if (noResults) noResults.style.display = "none";
    }

    // Duyệt qua từng xe và tạo mã HTML thẻ xe
    carList.forEach(function(car) {
        const card = document.createElement("div");
        card.className = "car-card";
        card.setAttribute("data-category", car.category);
        card.setAttribute("data-id", car.id);

        card.innerHTML = `
            <div class="card-media">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
                <div class="card-badges">
                    <span class="badge-tag ${car.badgeClass}">${car.badge}</span>
                </div>
            </div>
            <div class="car-body">
                <span class="car-category-sub">${car.category === 'EQ' ? 'Mercedes-EQ Điện Hóa' : car.category === 'AMG' ? 'Mercedes-AMG Thể Thao' : 'Mercedes-Benz ' + car.category}</span>
                <h3 class="car-title">${car.name}</h3>
                <p class="car-desc">${car.desc}</p>
                
                <div class="car-specs">
                    <div class="spec-item">
                        <span class="spec-val">${car.powerText}</span>
                        <span class="spec-lbl">Công suất</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-val">${car.acceleration}</span>
                        <span class="spec-lbl">0-100 km/h</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-val">${car.transmission.split('/')[0]}</span>
                        <span class="spec-lbl">Hộp số</span>
                    </div>
                </div>

                <div class="car-price-wrap">
                    <span class="price-label">Giá niêm yết chính hãng:</span>
                    <div class="car-price">${car.formattedPrice}</div>
                </div>

                <div class="card-actions">
                    <button class="btn-card-detail" onclick="showCarDetails('${car.id}')" title="Xem chi tiết thông số xe">
                        <i class="fa-regular fa-eye"></i> Thông Số
                    </button>
                    <button class="btn-card-testdrive" onclick="chonXe('${car.name}')" title="Đăng ký lái thử xe này">
                        <i class="fa-solid fa-key"></i> Lái Thử VIP
                    </button>
                </div>
            </div>
        `;

        carListContainer.appendChild(card);
    });
}

// ==========================================================================
// 4. HÀM LỌC XE THEO PHÂN KHÚC (FILTER CARS)
// ==========================================================================
function filterCar(category, buttonElement) {
    currentCategory = category;

    // Cập nhật class 'active' cho các nút lọc
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    if (buttonElement) {
        buttonElement.classList.add("active");
    } else {
        // Nếu gọi từ footer hoặc nút khác
        buttons.forEach(btn => {
            const btnText = btn.innerText.toLowerCase();
            if ((category === 'all' && btnText.includes('tất cả')) ||
                (category === 'Sedan' && btnText.includes('sedan')) ||
                (category === 'SUV' && btnText.includes('suv')) ||
                (category === 'EQ' && btnText.includes('thuần điện')) ||
                (category === 'AMG' && btnText.includes('thể thao amg'))) {
                btn.classList.add("active");
            }
        });
    }

    applyFilterAndSearch();
}

// ==========================================================================
// 5. HÀM TÌM KIẾM XE THEO TÊN (LIVE SEARCH)
// ==========================================================================
function searchCar() {
    const input = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search");
    if (!input) return;
    currentSearchKeyword = input.value.trim().toLowerCase();

    // Hiện/Ẩn nút xóa tìm kiếm
    if (clearBtn) {
        clearBtn.style.display = (currentSearchKeyword.length > 0) ? "block" : "none";
    }

    applyFilterAndSearch();
}

// Hàm xóa nhanh nội dung tìm kiếm
function clearSearch() {
    const input = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search");
    if (input) input.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    currentSearchKeyword = "";
    applyFilterAndSearch();
}

// ==========================================================================
// 6. HÀM SẮP XẾP XE THEO GIÁ VÀ CÔNG SUẤT (SORT CARS)
// ==========================================================================
function sortCars(order) {
    currentSortOrder = order;
    applyFilterAndSearch();
}

// Hàm tổng hợp kết hợp Lọc Phân Khúc + Tìm Kiếm + Sắp Xếp
function applyFilterAndSearch() {
    let result = mercedesCars.filter(car => {
        // 1. Kiểm tra danh mục phân khúc
        const matchCategory = (currentCategory === "all") || 
                              (car.category === currentCategory);

        // 2. Kiểm tra từ khóa tìm kiếm (theo tên, động cơ, phân khúc, mô tả)
        const matchKeyword = (currentSearchKeyword === "") ||
                             car.name.toLowerCase().includes(currentSearchKeyword) ||
                             car.category.toLowerCase().includes(currentSearchKeyword) ||
                             car.engine.toLowerCase().includes(currentSearchKeyword) ||
                             car.desc.toLowerCase().includes(currentSearchKeyword);

        return matchCategory && matchKeyword;
    });

    // 3. Sắp xếp kết quả
    if (currentSortOrder === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSortOrder === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (currentSortOrder === "power-desc") {
        result.sort((a, b) => b.power - a.power);
    }

    renderCars(result);
}

// Hàm đặt lại toàn bộ bộ lọc
function resetFilter() {
    clearSearch();
    const defaultBtn = document.querySelector(".filter-btn");
    if (defaultBtn) filterCar('all', defaultBtn);
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) sortSelect.value = "default";
    currentSortOrder = "default";
    applyFilterAndSearch();
}

// ==========================================================================
// 7. HÀM XEM CHI TIẾT THÔNG SỐ XE (MODAL POPUP)
// ==========================================================================
function showCarDetails(carId) {
    const car = mercedesCars.find(c => c.id === carId);
    if (!car) return;

    const modalContent = document.getElementById("modal-content");
    const modal = document.getElementById("car-modal");

    // Tạo danh sách các tính năng nổi bật
    const featureListHtml = car.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join("");

    modalContent.innerHTML = `
        <div class="modal-car-hero">
            <img src="${car.image}" alt="${car.name}">
            <div class="modal-title-overlay">
                <span class="badge-tag ${car.badgeClass}">${car.badge}</span>
                <h2 style="font-size: 24px; color: #fff; margin-top: 5px; font-family: var(--font-heading);">${car.name}</h2>
            </div>
        </div>

        <div class="modal-car-details">
            <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">${car.desc}</p>
            
            <h4 style="color: var(--accent-blue); font-size: 14px; margin-bottom: 10px;">
                <i class="fa-solid fa-sliders"></i> THÔNG SỐ KỸ THUẬT NỔI BẬT
            </h4>
            
            <div class="modal-spec-grid">
                <div class="modal-spec-row">
                    <span>Động cơ:</span>
                    <strong>${car.engine}</strong>
                </div>
                <div class="modal-spec-row">
                    <span>Công suất cực đại:</span>
                    <strong>${car.powerText} (${car.power} Mã Lực)</strong>
                </div>
                <div class="modal-spec-row">
                    <span>Tăng tốc 0 - 100 km/h:</span>
                    <strong>${car.acceleration}</strong>
                </div>
                <div class="modal-spec-row">
                    <span>Hộp số & Dẫn động:</span>
                    <strong>${car.transmission}</strong>
                </div>
                <div class="modal-spec-row">
                    <span>Mức tiêu hao / Quãng đường:</span>
                    <strong>${car.fuelEco}</strong>
                </div>
                <div class="modal-spec-row">
                    <span>Phân khúc dòng xe:</span>
                    <strong>Mercedes-Benz ${car.category}</strong>
                </div>
            </div>

            <div class="modal-features">
                <h4><i class="fa-solid fa-star"></i> TRANG BỊ ĐẲNG CẤP ĐỘC QUYỀN</h4>
                <ul>
                    ${featureListHtml}
                </ul>
            </div>

            <div class="modal-actions">
                <div>
                    <span style="font-size: 11px; color: var(--text-muted); display: block; text-transform: uppercase;">GIÁ NIÊM YẾT CHÍNH HÃNG</span>
                    <strong style="font-size: 22px; color: #fff;">${car.formattedPrice}</strong>
                </div>
                <div>
                    <button class="btn-primary-glow" onclick="closeCarModal(); chonXe('${car.name}');">
                        <i class="fa-solid fa-key"></i> Đăng Ký Lái Thử Mẫu Này
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Khóa cuộn trang
}

function closeCarModal() {
    const modal = document.getElementById("car-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = ""; // Mở khóa cuộn trang
}

function closeModalOnBackdrop(event) {
    if (event.target.id === "car-modal") {
        closeCarModal();
    }
}

// Đóng modal & Popover Zalo khi nhấn phím ESC
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeCarModal();
        const zaloPopover = document.getElementById("zalo-chat-popover");
        if (zaloPopover) zaloPopover.classList.remove("active");
    }
});

// ==========================================================================
// 8. TỰ ĐỘNG CHỌN XE & CUỘN XUỐNG FORM LIÊN HỆ (AUTO-FILL FORM & SMOOTH SCROLL)
// - Công dụng: Tự động điền tên xe vào ô input, kích hoạt hiệu ứng chớp sáng viền ô và cuộn mượt xuống Form
// - Tác dụng: Nâng cao trải nghiệm người dùng (UX), tiết kiệm thời gian gõ phím cho khách hàng VIP
// - Công nghệ: 
//     + DOM manipulation: carInput.value = tenXe
//     + Reflow Animation Re-trigger: void carInput.offsetWidth
//     + Smooth Scrolling API: scrollIntoView({ behavior: 'smooth' })
//     + Focus Event: carInput.focus()
// ==========================================================================
function chonXe(tenXe) {
    const carInput = document.getElementById("tenxe");
    const contactSection = document.getElementById("contact");

    if (carInput) {
        carInput.value = tenXe; // [CÔNG NGHỆ] Điền tự động giá trị vào ô input
        
        // [CÔNG NGHỆ: DOM Reflow] Buộc trình duyệt tính toán lại layout để kích hoạt lại @keyframes flashInput
        carInput.classList.remove("field-highlight");
        void carInput.offsetWidth; 
        carInput.classList.add("field-highlight");
        
        // Focus con trỏ chuột vào ô nhập sau khi cuộn tới
        setTimeout(() => {
            carInput.focus();
        }, 600);
    }

    // [CÔNG NGHỆ: Smooth Scroll] Cuộn màn hình êm ái tới Form liên hệ
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // [CÔNG NGHỆ: Toast Alert] Hiển thị thông báo nổi thông báo đã chọn dòng xe thành công
    showToast("Đã Chọn Dòng Xe", `Đã chọn mẫu xe <strong>${tenXe}</strong> cho buổi lái thử VIP. Vui lòng hoàn tất thông tin!`, "fa-car");
}

// ==========================================================================
// 9. XỬ LÝ ĐẶT HẸN TẠI SHOWROOM ĐẠI LÝ ỦY QUYỀN
// - Công dụng: Tự động chọn showroom tương ứng trong thẻ <select> và cuộn xuống form
// - Tác dụng: Giúp khách hàng chọn nhanh đại lý gần nhất mà không cần tìm thủ công
// - Công nghệ: selectElement.value, scrollIntoView smooth
// ==========================================================================
function datHenShowroom(showroomName) {
    const showroomSelect = document.getElementById("showroom");
    const contactSection = document.getElementById("contact");

    if (showroomSelect) {
        showroomSelect.value = showroomName;
        showroomSelect.classList.remove("field-highlight");
        void showroomSelect.offsetWidth; // Trigger reflow
        showroomSelect.classList.add("field-highlight");
    }

    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
    }

    showToast("Đại Lý Phục Vụ", `Đã chọn phục vụ tại <strong>${showroomName}</strong>.`, "fa-building");
}

// ==========================================================================
// 10. XỬ LÝ GỬI BIỂU MẪU ĐĂNG KÝ LÁI THỬ VIP (FORM VALIDATION & LOCALSTORAGE)
// - Công dụng: Kiểm tra hợp lệ dữ liệu, hiển thị spinner đang gửi, lưu lịch hẹn vào LocalStorage
// - Tác dụng: Ngăn reload trang mặc định, cung cấp phản hồi trực quan và lưu trữ dữ liệu bền vững
// - Công nghệ:
//     + event.preventDefault(): Chặn hành vi submit mặc định của form (chuẩn SPA)
//     + Loading state: innerHTML với icon spinner Font Awesome
//     + Web Storage API (localStorage): Lưu mảng JSON lịch hẹn trên trình duyệt
// ==========================================================================
function guiThongTin(event) {
    event.preventDefault(); // [CÔNG NGHỆ] Ngăn trình duyệt reload lại trang

    const hotenInput = document.getElementById("hoten");
    const sdtInput = document.getElementById("sdt");
    const emailInput = document.getElementById("email");
    const tenxeInput = document.getElementById("tenxe");
    const showroomSelect = document.getElementById("showroom");
    const hinhthucSelect = document.getElementById("hinhthuc");
    const ngaylaiInput = document.getElementById("ngaylai");
    const ghichuInput = document.getElementById("ghichu");
    const submitBtn = document.getElementById("btn-submit-booking");

    const hoten = hotenInput ? hotenInput.value.trim() : "";
    const sdt = sdtInput ? sdtInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const tenxe = tenxeInput ? tenxeInput.value.trim() : "";
    const showroom = showroomSelect ? showroomSelect.value : "Mercedes-Benz Showroom";
    const hinhthuc = hinhthucSelect ? hinhthucSelect.value : "Showroom VIP";
    const ngaylai = ngaylaiInput ? ngaylaiInput.value : "Trong tuần này";
    const ghichu = ghichuInput ? ghichuInput.value.trim() : "";

    // [CÔNG NGHỆ: Validation] Kiểm tra các trường bắt buộc không được để trống
    if (!hoten || !sdt || !tenxe) {
        showToast("Thiếu Thông Tin", "Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Mẫu xe muốn trải nghiệm!", "fa-triangle-exclamation");
        return;
    }

    // [CÔNG NGHỆ: UI Feedback] Hiệu ứng nút đang gửi kèm icon xoay tròn
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang Tiếp Nhận Hồ Sơ VIP...`;

    setTimeout(() => {
        // [CÔNG NGHỆ: LocalStorage] Lưu dữ liệu lịch hẹn dưới dạng mảng JSON trên trình duyệt
        const bookingData = {
            id: "MB-" + Date.now(),
            customerName: hoten,
            phone: sdt,
            email: email,
            car: tenxe,
            showroom: showroom,
            type: hinhthuc,
            date: ngaylai,
            notes: ghichu,
            createdAt: new Date().toLocaleString('vi-VN')
        };

        const existingBookings = JSON.parse(localStorage.getItem("mercedes_testdrive_bookings") || "[]");
        existingBookings.push(bookingData);
        localStorage.setItem("mercedes_testdrive_bookings", JSON.stringify(existingBookings));

        // Khôi phục trạng thái nút ban đầu
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;

        // Reset lại form về rỗng
        document.getElementById("test-drive-form").reset();

        // [CÔNG NGHỆ: Toast Alert] Hiển thị thông báo chúc mừng thành công sang trọng
        showToast(
            "Đăng Ký Thành Công! ⭐", 
            `Kính chào <strong>${hoten}</strong>, Mercedes-Benz đã ghi nhận yêu cầu lái thử xe <strong>${tenxe}</strong> (${hinhthuc}). Chuyên viên tư vấn VIP sẽ liên hệ trong ít phút!`,
            "fa-circle-check"
        );
    }, 600);
}

// ==========================================================================
// 11. HỆ THỐNG HIỂN THỊ TOAST NOTIFICATION TỰ HỦY
// - Công dụng: Tạo và hiển thị hộp thông báo nổi góc trên bên phải màn hình
// - Tác dụng: Cung cấp thông báo phản hồi ngay lập tức cho mọi tương tác quan trọng
// - Công nghệ: DOM createElement, Dynamic Injection, Tự động dọn rác DOM (toast.remove()) sau 5s
// ==========================================================================
function showToast(title, message, iconClass = "fa-circle-info") {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    // [CÔNG NGHỆ: Dynamic Element] Tạo phần tử toast mới
    const toast = document.createElement("div");
    toast.className = "toast";

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${iconClass}"></i>
        </div>
        <div class="toast-body">
            <h5>${title}</h5>
            <p>${message}</p>
        </div>
    `;

    toastContainer.appendChild(toast);

    // [CÔNG NGHỆ: Garbage Collection / Dọn dẹp DOM] Tự động trượt mờ và xóa khỏi DOM sau 5 giây
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.4s ease";
        setTimeout(() => {
            toast.remove(); // [CÔNG NGHỆ] Xóa hoàn toàn node khỏi DOM để giải phóng bộ nhớ
        }, 400);
    }, 5000);
}

// ==========================================================================
// 12. XỬ LÝ MENU MOBILE, THANH CUỘN & NÚT BACK TO TOP & SCROLL SPY
// - Công dụng:
//     + Đóng mở menu trượt (Hamburger) trên thiết bị di động
//     + Đổi màu nền Header khi cuộn qua 50px
//     + Hiển thị nút Back-to-Top khi cuộn qua 400px
//     + Tự động kích hoạt gạch chân menu tương ứng với Section đang đọc (Scroll Spy)
// - Công nghệ: window.addEventListener("scroll"), offsetTop, classList.toggle
// ==========================================================================
function toggleMobileMenu() {
    const navMenu = document.getElementById("nav-menu");
    if (navMenu) {
        navMenu.classList.toggle("open"); // [CÔNG NGHỆ] Bật/tắt class open để mở menu di động
    }
}

function initScrollEvents() {
    const header = document.getElementById("main-header");
    const backToTop = document.getElementById("btn-back-to-top");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", function() {
        // [CÔNG DỤNG] Đổi màu Header sang nền đậm hơn khi cuộn qua 50px
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Hiện nút Back to top khi cuộn qua 400px
        if (window.scrollY > 400) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }

        // Scroll Spy: Đổi trạng thái active cho menu khi cuộn tới từng section
        const sections = document.querySelectorAll("section[id]");
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // Đóng menu mobile khi người dùng bấm vào một liên kết menu
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const navMenu = document.getElementById("nav-menu");
            if (navMenu) navMenu.classList.remove("open");
        });
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==========================================================================
// 13. XỬ LÝ BONG BÓNG ZALO CHAT & TƯƠNG TÁC WIDGET LIÊN HỆ VIP
// - Công dụng:
//     + Bật / tắt hộp thoại Mini Chat Zalo & Quét mã QR
//     + Tự động ẩn số thông báo badge khi khách đã mở chat
//     + Tự đóng khi click ra ngoài
// ==========================================================================
function toggleZaloWidget() {
    const popover = document.getElementById("zalo-chat-popover");
    const badge = document.querySelector(".zalo-badge");
    if (!popover) return;

    const isActive = popover.classList.toggle("active");
    
    // Ẩn badge thông báo khi người dùng đã click mở chat
    if (isActive && badge) {
        badge.style.display = "none";
    }
}

// Lắng nghe sự kiện click bên ngoài để đóng popover Zalo
document.addEventListener("click", function(event) {
    const popover = document.getElementById("zalo-chat-popover");
    const zaloBtn = document.getElementById("btn-zalo-toggle");
    if (!popover || !zaloBtn) return;

    if (popover.classList.contains("active")) {
        // Nếu click không thuộc popover và cũng không thuộc nút mở zalo
        if (!popover.contains(event.target) && !zaloBtn.contains(event.target)) {
            popover.classList.remove("active");
        }
    }
});

