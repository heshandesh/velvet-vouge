<?php
$isFetchRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if (!$isFetchRequest) {
    header('Location: ../../pages/index.php');
    exit();
}
?>

<div class="pagination-container">
    <div class="no-result" id="divNoResults">No Results</div>
    <div class="pagination" id="divPagination">
        <div class="pages">
            <button id="btnPrevPage" onclick="JumpPrevPage()"><i class="fa-solid fa-chevron-left"></i></button>
            <button id="btnFirstPage" onclick="JumpPageByNumber(1)">1</button>


            <div id="divPageButtonContainer">
                <!-- buttons -->
            </div>
            <!-- <button><i class="fa-solid fa-ellipsis"></i></button>
            <button onclick="JumpPageByNumber(3)">3</button>
            <button>4</button>
            <button>5</button>
            <button><i class="fa-solid fa-ellipsis"></i></button> -->

            <button onclick="JumpLastPage()" id="btnLastPageNumber">Loading</button>
            <button id="btnNextPage" onclick="JumpNextPage()"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="separator"></div>
        <div class="jump-page">
            <div class="jump-input">
                <input type="number" id="inputJumpPageNumber" min="1" placeholder="1" />
                <span id="spanTotalPageCount">/Loading</span>
            </div>
            <button id="btnJumpByPageNumberInput" onclick="JumpPage()">Jump</button>
        </div>
    </div>
</div>