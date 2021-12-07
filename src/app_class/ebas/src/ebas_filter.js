import _ from "underscore";

export default class {
  constructor(http) {
    this.$http = http
    this.site_list = null
    this.curr_site_list = this.site_list
    this.selection = {
      site: { item: [], val: [], all: false },
      component: { item: [], val: [], all: false },
      matrix: { item: [], val: [], all: false },
      country: { item: [], val: [], all: false },
      land_use: { item: [], val: [], all: false },
      station_setting: { item: [], val: [], all: false },
      year: { item: [], val: [], all: false },
      resolution: { item: [], val: [], all: false },
    }
  }

  async get_site_list(headers) {
    let response = await this.$http.get("/ebas/site_list", {
      headers: headers,
      withCredentials: true,
    });
    if (response.data.code == 0) {
      this.site_list = response.data.data;
      this.curr_site_list = this.site_list
    }

    return Promise.resolve({ code: response.data.code, msg: response.data.msg })
  }

  init_selections(year_fixed = null, select_all = false) {
    // if the user unselect all, the same selection will be generated, but the select_all = false
    let site = [];
    let component = [];
    let matrix = [];
    let country = [];
    let land_use = [];
    let station_setting = [];
    let year = [];
    let resolution = [];

    this.curr_site_list.forEach((x) => {
      site.push({ id: x.id, name: x.name });
      country.push(x.country);
      land_use.push(x.land_use);
      station_setting.push(x.station_setting);
      //  the compoenet array is [name, matrix, resolution, st, ed]
      let co = [];
      let ma = [];
      let yr = [];
      let re = [];
      x.components.forEach((c) => {
        co.push(c[0]);
        ma.push(c[1]);
        re.push(c[2]);
        // date [string]: "2014-04-17T09:05:00.000000512"
        let ss = parseInt(c[3].slice(0, 4));
        let ee = parseInt(c[4].slice(0, 4));
        yr.push(...Array.from({ length: ee - ss + 1 }, (_, i) => i + ss));
      });
      component = _.union(component, co);
      matrix = _.union(matrix, ma);
      resolution = _.union(resolution, re);
      year = _.union(year, yr);
    });

    site = _.uniq(site).sort().reverse();
    country = _.uniq(country).sort();
    land_use = _.uniq(land_use).sort();
    station_setting = _.uniq(station_setting).sort();
    component = _.uniq(component).sort();
    matrix = _.uniq(matrix).sort();
    year = _.uniq(year).sort().reverse();
    resolution = _.uniq(resolution).sort();
    if (land_use[land_use.length - 1] == null) {
      land_use[land_use.length - 1] = "Not given"
    }
    if (station_setting[station_setting.length - 1] == null) {
      station_setting[station_setting.length - 1] = "Not given"
    }

    year = year_fixed == null ? year : year_fixed

    this.selection = {
      site: { item: site, val: [], all: select_all },
      component: { item: component, val: [], all: select_all },
      matrix: { item: matrix, val: [], all: select_all },
      country: { item: country, val: [], all: select_all },
      land_use: { item: land_use, val: [], all: select_all },
      station_setting: { item: station_setting, val: [], all: select_all },
      year: { item: year, val: [], all: select_all },
      resolution: { item: resolution, val: [], all: select_all },
    };
  }


  reset_selection() {
    this.curr_site_list = this.site_list
    this.init_selections()
  }

  filter_ebas(selection) {
    // console.log(selection)
    var filtered = []
    this.curr_site_list.forEach(site => {
      var isSelect = true
      var site_temp = {
        alt: site.alt,
        components: [],
        country: site.country,
        // file_num: 0,
        id: site.id,
        lat: site.lat,
        lon: site.lon,
        name: site.name,
        land_use: site.land_use,
        station_setting: site.station_setting,
      }

      let index_1 = _.indexOf(selection.station_setting.val, "Not given")
      let index_2 = _.indexOf(selection.land_use.val, "Not given")
      if (index_1 != -1) selection.station_setting.val[index_1] = null
      if (index_2 != -1) selection.land_use.val[index_2] = null

      for (const [key, value] of Object.entries(selection)) {
        if (key == "site" && value.val.length > 0) {
          let site_id = value.val.map(x => x.id)
          if (!site_id.includes(site.id)) {
            isSelect = false
            break
          }
        }
        else if (["country", "land_use", "station_setting"].includes(key) && value.val.length > 0) {
          if (!value.val.includes(site[key])) {
            isSelect = false
            break
          }
        }
      }

      if (isSelect) {
        var isAdded = false
        site.components.forEach(c => {
          var add_c = true
          if ("component" in selection && selection.component.val.length > 0) {
            if (!selection["component"].val.includes(c[0])) add_c = false
          }
          if ("matrix" in selection && selection.matrix.val.length > 0) {
            if (!selection["matrix"].val.includes(c[1])) add_c = false
          }
          if ("resolution" in selection && selection.resolution.val.length > 0) {
            if (!selection["resolution"].val.includes(c[2])) add_c = false
          }
          if ("year" in selection && selection.year.val.length > 0) {
            var st = parseInt(c[3].slice(0, 4));
            var ed = parseInt(c[4].slice(0, 4));
            var mx = Math.max(...selection["year"].val)
            var mi = Math.min(...selection["year"].val)

            if (ed < mi || st > mx) add_c = false
          }
          if (add_c) {
            site_temp.components.push(c)
            isAdded = true
          }
        })
        if (!isAdded) isSelect = false
      }

      if (isSelect) filtered.push(site_temp)
    })

    // console.log(filtered)
    this.curr_site_list = filtered
    var yr_p = selection.year.val.length > 0 ? selection.year.val : selection.year.item
    this.init_selections(yr_p)
  }

  selection2query(selection) {
    // convert ui selection to ebas query conditions
    let st = Math.min(...selection.year.val) + "-01-01"
    let ed = Math.max(...selection.year.val) + "-12-31"

    let index_1 = _.indexOf(selection.station_setting.val, "Not given")
    let index_2 = _.indexOf(selection.land_use.val, "Not given")
    if (index_1 != -1) selection.station_setting.val[index_1] = null
    if (index_2 != -1) selection.land_use.val[index_2] = null

    let query = {
      id: selection.site.item.map(x => x.id),
      country: selection.country.val,
      component: selection.component.val,
      matrix: selection.matrix.val,
      station_setting: selection.station_setting.val,
      land_use: selection.land_use.val,
      st: st,
      ed: ed,
    }

    let empty_keys = []
    for (const [key, value] of Object.entries(query)) {
      if (value.length == 0) {
        empty_keys.push(key)
      }
    }

    empty_keys.forEach(x => {
      delete query[x]
    })

    return query
  }

}