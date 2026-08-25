// ==========================================================================
// ĐỒ ÁN FRONTEND - GIAI ĐOẠN 3: XỬ LÝ DỮ LIỆU & RENDER DOM JAVASCRIPT THUẦN
// Tệp tin: giai_doan_3/script.js
// Mục tiêu:
//   1. Chuẩn hóa cơ sở dữ liệu mảng đối tượng 10 mẫu xe Mercedes-Benz (JSON Dataset)
//   2. Lập trình hàm nạp động giao diện bằng JavaScript thuần (Dynamic DOM Rendering)
//   3. Xây dựng thuật toán lọc (Filter), tìm kiếm thời gian thực (Live Search) và sắp xếp (Sort)
//   4. Lập trình hộp thoại xem chi tiết thông số kỹ thuật (Modal Popup)
// Công nghệ: Vanilla JS (ES6+), Array Higher-Order Functions (.forEach, .filter, .sort, .find)
// ==========================================================================

/* ==========================================================================
   1. CƠ SỞ DỮ LIỆU CÁC DÒNG XE MERCEDES-BENZ (ARRAY OF OBJECTS / JSON SCHEMA)
   - Công dụng: Lưu trữ toàn bộ thông tin chuẩn hóa của 10 mẫu xe chính hãng
   - Tác dụng: Cung cấp nguồn dữ liệu thống nhất cho các hàm Render, Filter, Search và Modal
   - Công nghệ: Mảng đối tượng JavaScript (Array of Objects)
   ========================================================================== */
const mercedesCars = [
    {
        id: "c300",                           // Mã định danh duy nhất (Unique Identifier)
        name: "Mercedes-Benz C 300 AMG",       // Tên dòng xe
        category: "Sedan",                    // Phân khúc phân loại
        badge: "Bán Chạy Nhất",               // Nhãn huy hiệu nổi bật
        badgeClass: "badge-sedan",            // Class CSS định dạng màu nhãn
        price: 2099000000,                    // Giá trị số nguyên (dùng để sắp xếp và tính toán)
        formattedPrice: "2.099.000.000 VNĐ",  // Chuỗi giá định dạng chuẩn hiển thị
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
        desc: "Thiết kế thể thao AMG Line trẻ trung, động cơ 2.0L thế hệ mới tích hợp công nghệ Mild Hybrid EQ Boost.",
        power: 258,                           // Công suất số nguyên (hp) dùng sắp xếp
        powerText: "258 hp",
        acceleration: "6.0s",
        engine: "2.0L Turbo + EQ Boost",
        transmission: "9G-TRONIC / RWD",
        fuelEco: "7.4L / 100km",
        features: ["Đèn pha DIGITAL LIGHT", "Màn hình 11.9 inch", "Gói AMG Line", "Loa Burmester 3D"]
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
        desc: "Biểu tượng thành đạt của các doanh nhân. Khoang lái sang trọng tuyệt đối cùng khả năng cách âm đỉnh cao.",
        power: 258,
        powerText: "258 hp",
        acceleration: "6.2s",
        engine: "2.0L Turbo I4",
        transmission: "9G-TRONIC / RWD",
        fuelEco: "7.9L / 100km",
        features: ["Treo AGILITY CONTROL", "Cửa sổ trời Panorama", "Vô lăng Nappa D-Cut", "Tạo mùi AIR-BALANCE"]
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
        desc: "Dòng Sedan đầu bảng tinh hoa hội tụ. Hàng ghế sau thương gia chuẩn khoang hạng nhất với massage đá nóng.",
        power: 367,
        powerText: "367 hp",
        acceleration: "5.1s",
        engine: "3.0L Turbo I6 + EQ Boost",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "8.3L / 100km",
        features: ["Treo khí nén AIRMATIC", "Ghế thương gia ngả lưng", "Màn hình OLED 12.8 inch", "Tay nắm cửa ẩn"]
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
        desc: "Đỉnh cao tuyệt đối của sự xa xỉ. Động cơ V12 6.0L Biturbo danh giá kết hợp màu sơn hai tone màu thủ công.",
        power: 612,
        powerText: "612 hp",
        acceleration: "4.5s",
        engine: "6.0L V12 Biturbo Handcrafted",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "14.2L / 100km",
        features: ["Sơn 2 tông Maybach thủ công", "Loa Burmester 4D 31 loa", "Tủ lạnh & Ly bạc", "Cửa sau mở cử chỉ"]
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
        desc: "Mẫu SUV hạng sang thế hệ mới với khả năng vượt địa hình xuất sắc, nắp ca-pô trong suốt và gói AMG Dynamic.",
        power: 258,
        powerText: "258 hp",
        acceleration: "6.2s",
        engine: "2.0L Turbo Mild Hybrid",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "7.8L / 100km",
        features: ["Nắp ca-pô trong suốt quan sát gầm", "Dẫn động 4MATIC", "Mâm AMG 20 inch", "Đèn viền 64 màu"]
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
        desc: "SUV 7 chỗ cỡ lớn hạng sang. Không gian rộng lớn, quyền lực và cực kỳ tiện nghi cho cả gia đình.",
        power: 381,
        powerText: "381 hp",
        acceleration: "6.1s",
        engine: "3.0L I6 Turbo + EQ Boost",
        transmission: "9G-TRONIC / 4MATIC",
        fuelEco: "9.2L / 100km",
        features: ["Không gian 7 chỗ thực thụ", "Treo khí nén AIRMATIC", "MBUX hàng ghế sau", "Cửa sổ trời toàn cảnh"]
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
        desc: "Biểu tượng xe địa hình quyền lực thế giới. Động cơ V8 4.0L Biturbo thủ công cùng âm thanh ống xả thể thao AMG.",
        power: 585,
        powerText: "585 hp",
        acceleration: "4.5s",
        engine: "4.0L V8 Biturbo AMG Handcrafted",
        transmission: "AMG SPEEDSHIFT TCT 9G",
        fuelEco: "13.1L / 100km",
        features: ["3 khóa vi sai độc lập", "Ống xả kép bên hông xe", "Nội thất da Designo", "Khung gầm thép siêu cường"]
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
        desc: "Sedan thuần điện tương lai đầu bảng. Hệ số cản gió Cd 0.20 cùng màn hình siêu khủng MBUX Hyperscreen 56 inch.",
        power: 516,
        powerText: "516 hp",
        acceleration: "4.3s",
        engine: "Dual Motor Điện Kép 800V",
        transmission: "Hộp số điện đơn cấp",
        fuelEco: "770 km / 1 lần sạc",
        features: ["Màn hình Hyperscreen 56 inch", "Quãng đường 770 km WLTP", "Đánh lái bánh sau 10 độ", "Lọc không khí HEPA"]
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
        desc: "SUV thuần điện đa dụng hạng sang. Tích hợp sạc nhanh DC 10-80% chỉ trong 31 phút cùng khả năng vận hành êm ái.",
        power: 408,
        powerText: "408 hp",
        acceleration: "4.9s",
        engine: "Dual Electric Motor",
        transmission: "Hộp số điện thông minh",
        fuelEco: "550 km / 1 lần sạc",
        features: ["Dẫn động 4 bánh điện tử", "Định vị Electric Intelligence", "Gói hỗ trợ lái Plus", "Sạc siêu nhanh DC 31p"]
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
        desc: "Cỗ máy tốc độ đỉnh cao của Mercedes-AMG. Thiết kế khí động học chủ động, tăng tốc 0-100 km/h chỉ 3.2 giây.",
        power: 585,
        powerText: "585 hp",
        acceleration: "3.2s",
        engine: "4.0L V8 Biturbo AMG One-Man",
        transmission: "AMG SPEEDSHIFT MCT 9G",
        fuelEco: "315 km/h Tốc độ tối đa",
        features: ["Tăng tốc 0-100km/h trong 3.2s", "Cánh gió chủ động", "Phanh gốm Carbon Ceramic", "Vi sai điện tử cầu sau"]
    }
];

// Biến lưu trạng thái hiện tại của bộ lọc
let currentCategory = "all";       // Phân khúc đang chọn ('all', 'Sedan', 'SUV', 'EQ', 'AMG')
let currentSearchKeyword = "";     // Từ khóa tìm kiếm hiện tại (chuỗi thường)
let currentSortOrder = "default";  // Thứ tự sắp xếp ('default', 'price-asc', 'price-desc', 'power-desc')

/* [CÔNG NGHỆ: DOMContentLoaded] Tự động nạp toàn bộ danh sách 10 xe khi trang tải xong */
document.addEventListener("DOMContentLoaded", function() {
    renderCars(mercedesCars);
});

/* ==========================================================================
   2. HÀM NẠP ĐỘNG DANH SÁCH XE (DYNAMIC DOM RENDERING)
   - Công dụng: Nhận mảng dữ liệu xe làm tham số, tạo mã HTML động và gắn vào cây DOM
   - Tác dụng: Cập nhật giao diện tức thì khi người dùng lọc, tìm kiếm hoặc sắp xếp
   - Công nghệ: forEach, Template Literals (dấu ` `), innerHTML, appendChild
   ========================================================================== */
function renderCars(carList) {
    const carListContainer = document.getElementById("car-list");
    const noResults = document.getElementById("no-results");
    const visibleCount = document.getElementById("visible-count");

    if (!carListContainer) return;
    carListContainer.innerHTML = ""; // Xóa dữ liệu cũ trước khi nạp mới

    // Cập nhật số lượng xe hiển thị
    if (visibleCount) visibleCount.innerText = carList.length;

    // Hiển thị thông báo khi không có xe nào phù hợp
    if (carList.length === 0) {
        if (noResults) noResults.style.display = "block";
        return;
    } else {
        if (noResults) noResults.style.display = "none";
    }

    // Duyệt qua từng xe để tạo thẻ div.car-card
    carList.forEach(function(car) {
        const card = document.createElement("div");
        card.className = "car-card";
        card.innerHTML = `
            <div class="card-media">
                <img src="${car.image}" alt="${car.name}" loading="lazy">
                <div class="card-badges"><span class="badge-tag ${car.badgeClass}">${car.badge}</span></div>
            </div>
            <div class="car-body">
                <span class="car-category-sub">Mercedes-Benz ${car.category}</span>
                <h3 class="car-title">${car.name}</h3>
                <p class="car-desc">${car.desc}</p>
                <div class="car-specs">
                    <div class="spec-item"><span class="spec-val">${car.powerText}</span><span class="spec-lbl">Công suất</span></div>
                    <div class="spec-item"><span class="spec-val">${car.acceleration}</span><span class="spec-lbl">0-100 km/h</span></div>
                    <div class="spec-item"><span class="spec-val">${car.transmission.split('/')[0]}</span><span class="spec-lbl">Hộp số</span></div>
                </div>
                <div class="car-price-wrap">
                    <span class="price-label">Giá niêm yết:</span>
                    <div class="car-price">${car.formattedPrice}</div>
                </div>
                <div class="card-actions">
                    <button class="btn-card-detail" onclick="showCarDetails('${car.id}')"><i class="fa-regular fa-eye"></i> Thông Số</button>
                    <button class="btn-card-testdrive" onclick="alert('Đã chọn: ' + '${car.name}')"><i class="fa-solid fa-key"></i> Lái Thử VIP</button>
                </div>
            </div>
        `;
        carListContainer.appendChild(card);
    });
}

/* ==========================================================================
   3. HÀM LỌC THEO PHÂN KHÚC XE (FILTER CATEGORY)
   - Công dụng: Cập nhật phân khúc được chọn và đổi trạng thái active cho nút bấm
   ========================================================================== */
function filterCar(category, buttonElement) {
    currentCategory = category;
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    if (buttonElement) buttonElement.classList.add("active");
    applyFilterAndSearch();
}

/* ==========================================================================
   4. HÀM TÌM KIẾM XE THEO THỜI GIAN THỰC (LIVE SEARCH)
   - Công dụng: Đọc từ khóa người dùng gõ từ ô #search-input, ẩn hiện nút xóa nhanh (x)
   - Công nghệ: onkeyup event, String.toLowerCase(), String.trim()
   ========================================================================== */
function searchCar() {
    const input = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search");
    if (!input) return;
    currentSearchKeyword = input.value.trim().toLowerCase();
    if (clearBtn) clearBtn.style.display = (currentSearchKeyword.length > 0) ? "block" : "none";
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

/* ==========================================================================
   5. HÀM SẮP XẾP XE (SORT CARS)
   - Công dụng: Cập nhật tiêu chí sắp xếp giá hoặc mã lực
   ========================================================================== */
function sortCars(order) {
    currentSortOrder = order;
    applyFilterAndSearch();
}

/* ==========================================================================
   6. THUẬT TOÁN KẾT HỢP LỌC + TÌM KIẾM + SẮP XẾP (CORE LOGIC)
   - Công dụng: Xử lý đồng thời 3 bộ lọc giúp kết quả luôn chính xác tuyệt đối
   - Công nghệ: Array.prototype.filter() và Array.prototype.sort()
   ========================================================================== */
function applyFilterAndSearch() {
    // Bước 1: Lọc dữ liệu kết hợp phân khúc và từ khóa đa trường
    let result = mercedesCars.filter(car => {
        const matchCategory = (currentCategory === "all") || (car.category === currentCategory);
        const matchKeyword = (currentSearchKeyword === "") ||
                             car.name.toLowerCase().includes(currentSearchKeyword) ||
                             car.category.toLowerCase().includes(currentSearchKeyword) ||
                             car.desc.toLowerCase().includes(currentSearchKeyword);
        return matchCategory && matchKeyword;
    });

    // Bước 2: Sắp xếp mảng kết quả
    if (currentSortOrder === "price-asc") {
        result.sort((a, b) => a.price - b.price);        // Giá thấp đến cao
    } else if (currentSortOrder === "price-desc") {
        result.sort((a, b) => b.price - a.price);        // Giá cao đến thấp
    } else if (currentSortOrder === "power-desc") {
        result.sort((a, b) => b.power - a.power);        // Công suất mạnh nhất
    }

    // Bước 3: Nạp dữ liệu đã xử lý lên màn hình
    renderCars(result);
}

// Đặt lại toàn bộ bộ lọc về trạng thái ban đầu
function resetFilter() {
    clearSearch();
    const defaultBtn = document.querySelector(".filter-btn");
    if (defaultBtn) filterCar('all', defaultBtn);
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) sortSelect.value = "default";
    currentSortOrder = "default";
    applyFilterAndSearch();
}

/* ==========================================================================
   7. HỘP THOẠI POPUP CHI TIẾT THÔNG SỐ XE (MODAL POPUP)
   - Công dụng: Tìm kiếm xe theo ID bằng Array.prototype.find(), nạp thông tin vào modal
   - Tác dụng: Khóa cuộn trang khi mở modal, hỗ trợ đóng linh hoạt (X, backdrop, ESC)
   ========================================================================== */
function showCarDetails(carId) {
    const car = mercedesCars.find(c => c.id === carId); // [CÔNG NGHỆ] Tìm chính xác xe theo ID
    if (!car) return;

    const modalContent = document.getElementById("modal-content");
    const modal = document.getElementById("car-modal");
    const featureListHtml = car.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join("");

    modalContent.innerHTML = `
        <div class="modal-car-hero">
            <img src="${car.image}" alt="${car.name}">
        </div>
        <div class="modal-car-details">
            <h2 style="color: #fff; margin-bottom: 10px; font-family: var(--font-heading);">${car.name}</h2>
            <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 15px;">${car.desc}</p>
            <div class="modal-spec-grid">
                <div class="modal-spec-row">Động cơ: <strong>${car.engine}</strong></div>
                <div class="modal-spec-row">Công suất: <strong>${car.powerText}</strong></div>
                <div class="modal-spec-row">Tăng tốc: <strong>${car.acceleration}</strong></div>
                <div class="modal-spec-row">Giá niêm yết: <strong>${car.formattedPrice}</strong></div>
            </div>
            <div class="modal-features">
                <h4 style="color: var(--accent-blue); margin-top: 15px;">Trang bị nổi bật:</h4>
                <ul>${featureListHtml}</ul>
            </div>
        </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Khóa cuộn trang khi mở modal
}

function closeCarModal() {
    const modal = document.getElementById("car-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = ""; // Mở khóa cuộn trang
}

function closeModalOnBackdrop(event) {
    if (event.target.id === "car-modal") closeCarModal();
}

// Lắng nghe sự kiện bàn phím: Bấm phím Escape để đóng nhanh Modal
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeCarModal();
});

