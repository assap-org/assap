<template lang="pug">
  .section
    form
      .field
        label.label
        .control
          input.input(
            v-model="credentials.AWS_KEY",
            type='text',
            placeholder='AWS Key'
          )
      .field
        label.label
        .control
          input.input(
            v-model="credentials.AWS_SECRET_KEY",
            type='password',
            placeholder='AWS Secret Key'
          )
      .field
        .control
          button.button.is-link(@click.submit.prevent="updateCredentials(credentials)") Actualizar credenciales
</template>

<script>
  import { getCredentials, setCredentials } from '@/utils/credentials';

  export default {
    name: 'configuration',
    data() {
      return {
        credentials: {
          AWS_KEY: '',
          AWS_SECRET_KEY: ''
        }
      };
    },
    mounted() {
      this.credentials = getCredentials();
    },
    methods: {
      updateCredentials(credentials){
        const { AWS_KEY, AWS_SECRET_KEY } = this.credentials;
        setCredentials(AWS_KEY, AWS_SECRET_KEY);
      }
    }
  }
</script>
