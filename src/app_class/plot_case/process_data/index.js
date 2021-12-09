import filtering from "./src/filtering"
import gathering from "./src/gathering"
import averaging from "./src/averaging"
import unit_convert from "./src/unit_convert"

export default class {
   constructor() {
      this.filtering = filtering.filtering
      this.gathering = gathering.gathering
      this.averaging = averaging.averaging
      this.unit_convert = unit_convert.unit_convert
   }

}