<div class="main">
    <div class="wrapper">
        <h3 class="text-center text-2xl py-3">Loading Question</h3>
        <div class="wrapper-cell">
            <div class="image" />
            <div class="text">
                <div class="text-line" />
                <div class="text-line" />
                <div class="text-line" />
                <div class="text-line" />
            </div>
        </div>
    </div>
</div>

<style>
    .main {
        background: #e9e9e9;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .wrapper {
        margin: 30px;
        padding: 30px;
        background: #fff;
        width: 360px;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .wrapper-cell {
        display: flex;
        margin-bottom: 30px;
    }
    @keyframes placeHolderShimmer {
        0% {
            background-position: -468px 0;
        }
        100% {
            background-position: 468px 0;
        }
    }
    .image,
    .text-line {
        animation-duration: 1.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background: #f6f6f6;
        background: linear-gradient(
            to right,
            #f6f6f6 8%,
            #f0f0f0 18%,
            #f6f6f6 33%
        );
        background-size: 800px 104px;
        height: 96px;
        position: relative;
    }
    .image {
        height: 60px;
        width: 60px;
    }
    .text {
        margin-left: 20px;
    }
    .text-line {
        height: 10px;
        width: 230px;
        margin: 4px 0;
    }
</style>
