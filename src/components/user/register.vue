<template>
  <div class="register-wrapper">
    <div class="register">
      <header>
        <h1>欢迎注册</h1>
        <div>已有账号，请 <router-link to="/login">登录</router-link>或
          <router-link to="/">返回首页</router-link>
        </div>
      </header>
      <div>
        <span><i class="iconfont">&#xe602;</i></span>
        <input type="text" placeholder="输入您的用户名" v-model="value.name" @focus="focus('name')" @blur="blur('name')">
        <div :class="classname.name" v-html="html.name"></div>
      </div>
      <div>
        <span><i class="iconfont">&#xe655;</i></span>
        <input type="text" placeholder="输入您的昵称" v-model="value.nickname" @focus="focus('nickname')" @blur="blur('nickname')">
        <div :class="classname.nickname" v-html="html.nickname"></div>
      </div>
      <div>
        <span><i class="iconfont">&#xe603;</i></span>
        <input type="password" placeholder="输入您的密码" v-model="value.pass1" @focus="focus('pass1')" @blur="blur('pass1')">
        <div :class="classname.pass1" v-html="html.pass1"></div>
      </div>
      <div>
        <span><i class="iconfont">&#xe603;</i></span>
        <input type="password" placeholder="再次输入您的密码" v-model="value.pass2" @focus="focus('pass2')" @blur="blurP2()">
        <div :class="classname.pass2" v-html="html.pass2"></div>
      </div>
      <p><input type="button" class="submit" value="注册" @click="submit()"></p>
      <div class="result" :class="classname.result" v-html="html.result"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import crypto from 'crypto'
import handleSession from '../mods/handleSession'
import {mapMutations} from 'vuex'
export default {
  name: 'register',
  data () {
    return {
      regx: {
        name: /^\w{6,16}$/,
        pass1: /^\w{8,16}$/,
        nickname: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,6}$/
      },
      tips: {
        name: '6-16位由字母、数字或下划线组成的字符串',
        pass1: '8-16位由字母、数字或下划线组成的字符串',
        pass2: '两次输入的密码需要一致',
        nickname: '1-6个汉字、数字、字母组成'
      },
      error: {
        name: '用户名格式不正确',
        pass1: '密码格式不正确',
        pass2: '两次输入的密码不一致',
        nickname: '昵称格式不对'
      },
      emptyErr: {
        name: '用户名不能为空',
        pass1: '密码不能为空',
        pass2: '请再次输入密码',
        nickname: '昵称不能为空'
      },
      right: '<i class="iconfont">&#xe652;</i>',
      isRight: {
        name: false,
        pass1: false,
        pass2: false,
        nickname: false
      },
      value: {
        name: '',
        pass1: '',
        pass2: '',
        nickname: ''
      },
      classname: {
        name: '',
        pass1: '',
        pass2: '',
        nickname: '',
        result: ''
      },
      html: {
        name: '',
        pass1: '',
        pass2: '',
        nickname: '',
        result: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateUser'
    ]),
    focus (str) {
      this.classname[str] = 'tips'
      this.html[str] = this.tips[str]
    },
    blur (str) {
      this.isRight[str] = false
      this.classname[str] = ''
      this.html[str] = ''
      let val = this.value[str]
      if (val) {
        if (this.regx[str].test(val)) {
          if (str === 'name') {
            this.classname[str] = 'error'
            this.html[str] = '验证中...'
            axios.get('/user/username', {
              params: {
                user: val
              }
            })
              .then((response) => {
                if (response.data) {
                  this.classname[str] = 'right'
                  this.html[str] = this.right
                  this.isRight[str] = true
                } else {
                  this.classname[str] = 'error'
                  this.html[str] = '该用户名已被使用'
                  this.isRight[str] = false
                }
              })
              .catch((error) => {
                console.log(error)
              })
            return
          }
          this.classname[str] = 'right'
          this.html[str] = this.right
          this.isRight[str] = true
        } else {
          this.classname[str] = 'error'
          this.html[str] = this.error[str]
        }
        if (str === 'pass1') {
          if (this.value.pass2) {
            this.blurP2()
          }
        }
      }
    },
    blurP2 () {
      this.isRight.pass2 = false
      this.classname.pass2 = ''
      this.html.pass2 = ''
      let val1 = this.value.pass1
      let val2 = this.value.pass2
      if (val1 && val2) {
        if (val1 === val2) {
          this.classname.pass2 = 'right'
          this.html.pass2 = this.right
          this.isRight.pass2 = true
        } else {
          this.classname.pass2 = 'error'
          this.html.pass2 = this.error.pass2
        }
      }
    },
    submit () {
      this.html.result = '请稍后...'
      let flag = true
      for (let item in this.isRight) {
        if (this.isRight.hasOwnProperty(item)) {
          if (!this.isRight[item]) {
            flag = false
            break
          }
        }
      }
      if (flag) {
        let md5 = crypto.createHash('md5')
        let newpass = md5.update(this.value.pass1).digest('hex')
        let username = this.value.name
        let nickname = this.value.nickname
        axios.post('/user/register', {
          name: username,
          nickname,
          password: newpass
        })
          .then((response) => {
            if (response.data.isOk) {
              // this.$refs.result.classList.remove('red')
              this.classname.result = ''
              this.html.result = '注册成功!'
              let userId = response.data.result.insertId
              let admin = 0
              handleSession.setSession('user', {id: userId, username, admin, nickname})
              this.updateUser({id: userId, username, admin, nickname})
              this.clear()
              setTimeout(() => {
                window.history.go(-1)
              }, 1000)
            } else {
              // this.$refs.result.classList.add('red')
              this.classname.result = 'red'
              this.html.result = response.data.msg
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        // this.$refs.result.classList.add('red')
        this.classname.result = 'red'
        this.html.result = '请检查输入'
      }
    },
    clear () {
      this.value.name = ''
      this.value.nickname = ''
      this.value.pass1 = ''
      this.value.pass2 = ''
    }
  },
  created () {
    let userInfo = handleSession.getSession('user')
    if (userInfo) {
      this.updateUser(userInfo)
      alert('您已经登录,不用再注册!')
      window.history.go(-1)
    }
  }
}
</script>
<style>
.register-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  padding-top: .5rem;
  width: 100%;
  height: 100%;
  font-size: .14rem;
  background-color: #F5F5F6;
  z-index: 99;
}
.register-wrapper .register{
  position: relative;
  margin: auto;
  width: 10rem;
  height: 5.3rem;
  background-color: #fff;
}
.register-wrapper .register header{
  position: relative;
  padding: .25rem 0;
  height: .5rem;
}
.register-wrapper .register header h1{
  margin: auto;
  height: .5rem;
  line-height: .5rem;
  width: 3rem;
  text-align: center;
  line-height: .5rem;
  color: #00B7D3;
  font-size: .22rem;
  font-weight: 400;
}
.register-wrapper .register header div{
  position: absolute;
  top: .5rem;
  right: .2rem;
}
.register-wrapper .register header div a{
  margin: .05rem;
  color:#00B7D3;
}
.register-wrapper .register > div{
  position: relative;
  margin: .25rem  auto;
  height: .4rem;
  width: 3.2rem;
  text-align: center;
  font-size: 0;
}
.register-wrapper .register > div span,.register-wrapper .register > div input{
  display: inline-block;
  height: .4rem;
  line-height: .4rem;
  border: 1px solid #00B7D3;
  vertical-align: middle;
}
.register-wrapper .register > div span{
  width: .4rem;
  font-size: .18rem;
  color:#fff;
  background-color:#00B7D3;
}
.register-wrapper .register > div input {
  padding-left: .1rem;
  width: 2.5rem;
  font-size: .14rem;
  outline: none;
}
.register-wrapper .register > div div{
  position: absolute;
  top: 0;
}
.register-wrapper .register > div .tips {
  right: -1.75rem;
  padding: .1rem;
  width: 1.5rem;
  font-size: .12rem;
  border: 1px solid #4DBC60;
  border-radius:.05rem ;
  box-shadow:0 0 .01rem 0.01rem #eee ;
}
.register-wrapper .register > div .tips:before{
  content:'';
  position: absolute;
  top: .05rem;
  left: -.1rem;
  border-top:.1rem solid transparent;
  border-bottom:.1rem solid transparent;
  border-right:.1rem solid #4DBC60;
}
.register-wrapper .register > div .right {
  right: -.15rem;
  color:green;
  font-size: .28rem;
}
.register-wrapper .register > div .error {
  right: -1.55rem;
  width: 1.5rem;
  height: .35rem;
  line-height: .35rem;
  font-size: .14rem;
  text-align: left;
  color:red;
}
.register-wrapper .register > P {
  text-align: center;
}
.register-wrapper .register > P input{
  width: 2rem;
  height: .4rem;
  line-height: .4rem;
  background-color: #00B7D3;
  font-size: .2rem;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius:.05rem;
}
.register-wrapper .register .result {
  width: 9rem;
  font-size: .16rem;
  color: green;
}
.register-wrapper .register .red{
  color: red;
}
</style>
