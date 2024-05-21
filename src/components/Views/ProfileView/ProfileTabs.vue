<script setup lang="ts"></script>

<template>
  <div className="tabs-container w-full flex centered">
    <input className="radio" id="one" name="group" type="radio" checked />
    <input className="radio" id="two" name="group" type="radio" />
    <div className="tabs w-full flex align-center justify-evenly">
      <label className="tab" id="one-tab" for="one"> Tweets </label>
      <label className="tab" id="two-tab" for="two"> Likes </label>
    </div>
  </div>
</template>

<style scoped>
.radio {
  display: none;
}

.tabs-container {
  height: 45px;

  border-bottom: 2px solid #efefef;
}

.tab {
  width: 220px;

  cursor: pointer;
  user-select: none;

  color: #000;

  font-size: 16px;
  font-weight: bold;

  padding: 10px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

#one:checked ~ .tabs #one-tab,
#two:checked ~ .tabs #two-tab {
  color: #3f37c9;

  border-bottom: 2px solid #3f37c9;
}
</style>
