import SLR from "ml-regression-simple-linear"
import TheilSenRegression from "ml-regression-theil-sen"
import Loess from "loess"

export default class {
   constructor() {
      this.y_predict = null
      this.y_upper = null
      this.y_lower = null
      this.func = null
      this.model = null
   }
   run(data, config) {
      let x = data.x
      let y = data.y
      switch (config.method) {
         case "Linear":
            this._slr(x, y)
            break;
         case "Sen's Slope":
            this._sen(x, y)
            break;
         case "LOWESS":
            this._loess(x, y, config.options)
            break;
      }
   }

   _slr(x, y) {
      // https://www.npmjs.com/package/ml-regression
      let regression = new SLR(x, y);
      this.y_predict = regression.predict(x)
      this.func = "SLR: " + regression.toString(3)
      this.model = regression
      this.y_upper = null
      this.y_lower = null
   }

   _sen(x, y) {
      // https://www.npmjs.com/package/ml-regression-theil-sen
      var regression = new TheilSenRegression(x, y);
      this.y_predict = regression.predict(x)
      this.func = "Sen's Slope: " +regression.toString(3)
      this.model = regression
      this.y_upper = null
      this.y_lower = null
   }

   _loess(x, y, options) {
      // https://github.com/yongjun21/loess
      // note: null is not allowed
      var data = {
         x: x,
         y: y
      }
      var model = new Loess(data, options)
      var fit = model.predict(data)

      this.y_predict = fit.fitted
      this.y_upper = fit.fitted.map((yhat, idx) => yhat + fit.halfwidth[idx])
      this.y_lower = fit.fitted.map((yhat, idx) => yhat - fit.halfwidth[idx])
      this.model = model
      this.func = "LOESS"
   }
}