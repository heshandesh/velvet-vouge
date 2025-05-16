<div class="filter">
    <div class="filter-options">
        <h3>Filter</h3>
        <p>Price</p>
        <div class="price-slider">
            <div class="price-input">
                <div class="field">
                    <span>Min</span>
                    <input type="number" class="input-min" value="2500" id="priceInputMin"
                        oninput="InputStartPrice(event)" onchange="InputStartPrice(event)" />
                </div>
                <div class="field">
                    <span>Max</span>
                    <input type="number" class="input-max" value="7500" id="priceInputMax"
                        oninput="InputEndPrice(event)" onchange="InputEndPrice(event)" />
                </div>
            </div>
            <div class="slider">
                <div class="progress"></div>
            </div>
            <div class="range-input">
                <input type="range" class="range-min" min="0" max="10000" value="0" step="100"
                    onchange="ChangePriceSlider()" />
                <input type="range" class="range-max" min="0" max="10000" value="10000" step="100"
                    onchange="ChangePriceSlider()" />
            </div>
        </div>
        <hr />
        <p>Color</p>
        <div class="tags colors" id="divFilterColorList">
            <!-- <button class="black active"></button>
              <button class="white"></button>
              <button class="pink"></button>
              <button class="red"></button>
              <button class="orange"></button>
              <button class="yellow"></button>
              <button class="green"></button>
              <button class="blue"></button> -->
        </div>
        <hr />
        <p>Sizes</p>
        <div class="tags sizes" id="divFilterSizeList">
            <!-- <button class="active">M</button>
              <button>L</button>
              <button>XL</button>
              <button>XXL</button> -->
        </div>
        <hr />
        <p>Type</p>
        <div class="tags types" id="divFilterTypeList">
            <!-- <button class="active">Cotton</button>
              <button>Silic</button> -->
        </div>
        <hr />
        <p>Gender</p>
        <div class="tags genders" id="divFilterGenderList">
            <!-- <button class="active">Men</button>
              <button>Women</button>
              <button>Unisex</button> -->
        </div>
        <button class="close-btn" onclick="CloseFilterBox()"><i class="fa-solid fa-xmark"></i></button>
    </div>
</div>