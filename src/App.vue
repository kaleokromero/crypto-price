<template>
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

  <div class="container">
    <h1 class="header"></h1>

    <div>
      <p class="banner-txt">Check the price of your favorite crypto!</p>
      <p class="sub-text">
        This project utilizes coingecko oficial API to provide you with current prices of your
        favorite crypto coin
      </p>
      <img src="./assets/banner.jpg" class="i" />
      <button @click="onSubmit" class="git-btn">My github</button>
    </div>

    <div class="ath-container">
      <h class="ath-text">All time high</h>
      <ul>
        <div class="btc-ath" v-for="coin in filteredBitcoin" :key="coin.id">
          <a>
            <img :src="coin.image" class="btc-img" />
            <a class="ath-info">{{ coin.name }}</a>
            <a class="price"> USD {{ coin.ath.toLocaleString() }}</a>
          </a>
        </div>
        <div class="eth-ath" v-for="coin in filteredEth" :key="coin.id">
          <a>
            <img :src="coin.image" class="eth-img" />
            <a class="ath-info">{{ coin.name }}</a>
            <a class="eth-price"> USD {{ coin.ath.toLocaleString() }}</a>
          </a>
        </div>
      </ul>
    </div>

    <div class="row">
      <h class="txt-mkt"> Market Update </h>
      <div class="search">
        <input
          type="text"
          class="search-input"
          placeholder="Search..."
          @keyup="searchCoin()"
          v-model="textSearch"
        />
        <a href="#" class="search-icon"> <i class="bx bx-search"></i> </a>
      </div>
      <table class="table table-dark">
        <thead>
          <tr>
            <th v-for="(title, index) in titles" :key="index">
              {{ title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="coin-i"
            style="height: 100px"
            v-for="(coin, index) in filteredCoins.slice(0, 20)"
            :key="coin.id"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img :src="coin.image" style="width: 4rem" />
              <span style="margin-left: 6px">
                {{ coin.name }}
              </span>
              <span> - {{ coin.symbol }} </span>
            </td>
            <td>${{ coin.current_price.toLocaleString() }}</td>
            <td :class="[coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger']">
              {{ coin.price_change_percentage_24h }}%
            </td>
            <td>${{ coin.total_volume.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
// eslint-disable-next-line no-unused-vars
import { computed } from 'vue'

export default {
  setup() {
    const observer = ref(null)

    onMounted(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }

      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
          } else {
            entry.target.style.opacity = '0'
            entry.target.style.filter = 'blur(0)'
          }
        })
      }, options)

      const elements = document.querySelectorAll('.ath-container, .row')
      elements.forEach((element) => {
        observer.value.observe(element)
      })
    })

    onUnmounted(() => {
      const elements = document.querySelectorAll('.ath-container, .row')
      elements.forEach((element) => {
        observer.value.unobserve(element)
      })
    })
    const onSubmit = () => {
      window.location.href = 'https://github.com/kaleokromero?tab=repositories'
    }
    return {
      onSubmit
    }
  },
  data() {
    return {
      coins: [],
      filteredCoins: [],
      titles: ['#', 'Name', 'Price ↕', 'Price Change ↕', 'Total Volume ↕'],
      textSearch: ''
    }
  },
  async mounted() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-qpjYCzDm9wbRj57S2Zwa7eoG'
      }
    }

    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&price_change_percentage=1s',
      options
    )
    const data = await res.json()
    this.coins = data
    this.filteredCoins = data
  },
  methods: {
    searchCoin() {
      this.filteredCoins = this.coins.filter((coin) =>
        coin.name.toLowerCase().includes(this.textSearch.toLowerCase())
      )
    }
  },
  computed: {
    filteredBitcoin() {
      return this.filteredCoins.filter((coin) => coin.name === 'Bitcoin')
    },
    filteredEth() {
      return this.filteredCoins.filter((coin) => coin.name === 'Ethereum')
    }
  }
}
</script>

<style>
.ath-container {
  opacity: 0;
  filter: blur(0px);
  transform: translateX(0%);
  transition: all 3s;
  animation: slideIn 4s left;
}
.row {
  opacity: 0;
  filter: blur(0px);
  transform: translateX(0%);
  transition: all 3s;
  animation: slideIn 4s left;
}

.i {
  position: relative;
  left: 50%;
  margin-top: 100px;
  width: 60rem;
  height: 42rem;
}

.banner-txt {
  position: absolute;
  top: 15%;
  right: 63%;
  margin-left: 40px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  font-size: 5rem;
  font-weight: 550;
  font-stretch: semi-expanded;
}

.sub-text {
  position: absolute;
  top: 50%;
  right: 65%;
  margin-left: 40px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  font-size: 2rem;
  font-weight: 200;
  font-stretch: normal;
  color: #929292;
}

.git-btn {
  position: absolute;
  top: 70%;
  right: 77%;
  margin-left: 40px;
  font-size: 3rem;
  width: 20%;
  border: 0px transparent;
  background-color: #2d4dff;
  border-radius: 40px;
  color: #fff;
}

.ath-container {
  width: 100%;
  margin-bottom: 100px;
  margin-top: 170px;
  height: 300px;
  background-color: #0b0924;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  top: 0;
  left: 2.5%;
}
.ath-text {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  font-size: 5rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btc-ath {
  height: 175px;
  width: 45%;
  background-color: #272541a2;
  border-radius: 10px;
  font-size: 3rem;
  position: absolute;
  top: 50%;
  right: 55%;
  text-align: center;
}
.btc-ath:hover {
  background-color: #2c2b3db9;
  transform: scale(1.1);
}
.eth-ath:hover {
  background-color: #2c2b3db9;
  transform: scale(1.1);
}
.eth-ath {
  height: 175px;
  width: 45%;
  background-color: #272541a2;
  border-radius: 10px;
  font-size: 3rem;
  position: absolute;
  top: 50%;
  left: 55%;
  text-align: center;
}
.price {
  position: relative;
  top: 40%;
  right: 25%;
  color: #fff;
  font-weight: 600;
}
.eth-price {
  position: relative;
  top: 40%;
  right: 30%;
  color: #ffffff;
  font-weight: 600;
}
.ath-info {
  padding-left: 25%;
  color: #fff;
}
.btc-img {
  width: 7rem;
  position: absolute;
  top: 30%;
}
.eth-img {
  width: 9rem;
  position: absolute;
  top: 25%;
}
.txt-mkt {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
}
.table-dark td {
  border: none !important;
}
.coin-i:hover {
  background-color: #2c2b3db9;
  transform: scaleY(1.1);
}
.table-dark {
  background-color: #0b0924;
  font-size: larger;
  color: #fff;
  width: 100%;
  border-radius: 10px;
  position: relative;
  left: 2.5%;
}

.header {
  font-family: fantasy;
  color: #000000c9;
  position: relative;
  left: 28%;
}
.search {
  width: 100%;
  margin-bottom: auto;
  margin-top: 20px;
  height: 50px;
  background-color: #3f3d5ab9;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  left: 2.5%;
}

.search-input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  margin-top: 5px;
  caret-color: transparent;
  line-height: 20px;
  transition: width 0.4s linear;
}

.search .search-input {
  padding: 0 10px;
  width: 100%;
  caret-color: #fff;
  font-size: 19px;
  font-weight: 300;
  color: rgb(255, 255, 255);
  transition: width 0.4s linear;
}

.search-icon {
  height: 34px;
  width: 34px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(184, 184, 184);
  background-color: #ffffff00;
  font-size: 20px;
  bottom: 30px;
  position: relative;
  border-radius: 5px;
}

.search-icon:hover {
  color: #148ace !important;
}

@media (max-width: 600px) {
  .i {
    left: 0;
    width: 80%;
    height: 40%;
    margin-top: 0%;
  }

  .banner-txt {
    top: 15%;
    right: 10%;
    font-size: 2rem;
    margin-top: 17rem;
  }

  .sub-text {
    top: 20%;
    right: 0;
    font-size: 1rem;
    margin-top: 20rem;
  }

  .git-btn {
    top: 30%;
    right: 10%;
    width: 80%;
    font-size: 1.5rem;
    margin-top: 190px;
    margin-bottom: 20px;
  }

  .ath-container {
    margin-top: 20rem;
    height: auto;
    font-size: medium;
    align-content: center;
  }
  .ath-text {
    margin-top: 20px;
    margin-bottom: 7px;
  }
  .ath-info {
    align-items: center;
    margin-right: 18px;
  }
  .btc-ath {
    width: 100%;
    right: 0%;
    left: 0%;
    font-size: 2rem;
    margin-top: 10rem;
  }
  .eth-ath {
    width: 100%;
    right: 0;
    left: 0;
    font-size: 2rem;
    margin-top: 30rem;
  }

  .price {
    font-size: small;
    font-weight: 700;
    right: 26%;
    top: 75%;
  }
  .eth-price {
    font-size: small;
    font-weight: 700;
    right: 32%;
    top: 75%;
  }

  .btc-img {
    width: 6rem;
    left: 40%;
  }
  .eth-img {
    width: 8rem;
    left: 35%;
  }
  .txt-mkt {
    margin-top: 20px;
  }
  .row {
    margin-top: 40rem;
  }
  .table-dark {
    font-size: medium;
  }
}
@media (min-width: 600px) and (max-width: 950px) {
  .i {
    left: 35%;
    width: 60%;
    height: 35%;
    margin-top: 50px;
  }

  .banner-txt {
    text-align: center;
    margin-top: 10rem;
    margin-left: 6%;
    top: 0%;
    right: 75%;
    font-size: 3.5rem;
  }

  .sub-text {
    text-align: center;
    margin-top: 4em;
    margin-bottom: 20px;
    margin-left: 6%;
    right: 75%;
    font-size: 1.3rem;
  }
  .git-btn {
    top: 50%;
    right: 10%;
    width: 85%;
    font-size: 2rem;
    margin-top: 20rem;
    margin-bottom: 30px;
  }
  .ath-container {
    margin-top: 25rem;
  }
  .ath-info {
    align-items: center;
  }
  .price {
    font-size: large;
    align-items: center;
    right: 25%;
  }
  .eth-price {
    font-size: medium;
    align-items: center;
    right: 35%;
  }
  .eth-img {
    left: 0%;
  }
}
@media (min-width: 950px) and (max-width: 1030px) {
  .i {
    left: 45%;
    width: 50%;
    height: 30%;
    margin-top: 7rem;
  }
  .banner-txt {
    text-align: center;
    margin-top: 15rem;
    top: 0%;
    font-size: 3.5rem;
    font-weight: 550;
    font-stretch: expanded;
  }
  .sub-text {
    text-align: center;
    font-size: 1.2em;
  }
  .git-btn {
    left: 5%;
  }
  .ath-container {
    margin-top: 18rem;
  }
  .eth-img {
    align-items: center;
    left: 10%;
  }
  .eth-price {
    align-items: center;
    font-size: large;
    right: 30%;
  }
  .price {
    font-size: large;
  }
}
</style>
