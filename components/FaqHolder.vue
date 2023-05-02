<template>
  <div class="my-5">
    <h5 class="text-faq">Çox soruşulan suallar</h5>

    <div class="accordion" id="accordionExample">
      <div class="accordion-item border-0">
        <button class=" fw-bold border-0 bg-light accordion-button accor-button" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Həkimdən necə randevu ala bilərəm?
        </button>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
            Siz saytdan online şəkildə və ya <a href="tel:0514414330">0514414330</a> nömrəsinə zəng etməklə randevu ala
            bilərsiz.
          </div>
        </div>
      </div>
      <div class="accordion-item border-0">

        <button class="accordion-button collapsed fw-bold bg-white" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Öz yaxınım üçün randevu ala bilərəm?
        </button>

        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
            Bəli, ala bilərsiz.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqHolder',
};
</script>

<style lang="scss" scoped>
.text-faq {
  font-size: 24px;
  line-height: 32px;
  color: #01234B;
}

.accordion-button {
  font-size: 16px !important;
  line-height: 19.2px;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(0, 0, 0, .125);
}

.accordion-body {
  font-size: 16px;
  line-height: 22.4px;
  color: rgba(60, 60, 67, 0.85);
  font-family: 'HK Grotesk';
}

.accordion-button:not(.collapsed) {
  background-color: none !important;
  color: black !important;
}

// .accordion-button:focus {
//   box-shadow: none;
// }

.accor-button {
  color: none !important;
  box-shadow: none !important;
  --bs-bg-opacity: none !important;
}
</style>
