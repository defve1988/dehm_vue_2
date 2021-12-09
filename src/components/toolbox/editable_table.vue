<template>
  <v-data-table
    :headers="headers"
    :items="table_data"
    dense
    disable-sort
    hide-default-footer
  >
    <template v-slot:body="{ items, headers }">
      <tbody>
        <tr v-for="(item, idx) in items" :key="idx">
          <td v-for="(header, key) in headers" :key="key">
            <v-edit-dialog
              :return-value.sync="item[header.value]"
            >
              {{ item[header.value] }}
              <template v-slot:input>
                <v-text-field
                  v-model="item[header.value]"
                  label="Edit"
                  single-line
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "editable_table",
  props:["headers", "table_data"],
  data: () => ({
  }),
};
</script>
<style scoped lang="scss">

</style>