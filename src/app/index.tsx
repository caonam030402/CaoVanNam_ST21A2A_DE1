import React, { useRef, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  a: yup
    .number()
    .typeError("Vui lòng nhập một số cho a")
    .required("Vui lòng nhập a"),
  b: yup
    .number()
    .typeError("Vui lòng nhập một số cho b")
    .required("Vui lòng nhập b"),
});

export default function Page() {
  const sheet = useRef<ActionSheetRef>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // console.log(errors.a.message);

  const [result, setResult] = useState<string>("");

  const onSubmit = (data) => {
    const a = Number(data.a);
    const b = Number(data.b);
    phuongTrinhBac1(a, b);
  };

  const phuongTrinhBac1 = (a: number, b: number) => {
    const x = a == 0 && b == 0 ? 0 : -b / a;

    if (x == 0) {
      setResult("Phương trình không phải là phương trình bậc nhất");
    } else {
      setResult(`Nghiệm của phương trình là: x = ${x}`);
    }

    sheet.current.show();
  };

  return (
    <View className="flex items-center flex-1 px-4 lg:px-6 bg-[#F6F6F6]">
      <Text className="text-center text-xl font-bold mt-16">PT BẬC 1</Text>
      <Controller
        name="a"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text className="mt-5">Nhập hệ số a *</Text>
            <View
              className={`mt-[10px] flex flex-row items-center border bg-white border-gray-300 h-[50px] w-full rounded-xl p-2 px-4 ${
                errors.a && "bg-red-300 border-red-300"
              }`}
            >
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                className={`flex-1`}
              />
            </View>
            <Text className="mt-1 text-sm text-red-800">
              {errors.a && errors.a.message}
            </Text>
          </View>
        )}
      />
      <Controller
        name="b"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text className="mt-5">Nhập hệ số b *</Text>
            <View
              className={`mt-[10px] flex flex-row items-center border bg-white border-gray-300 h-[50px] w-full rounded-xl p-2 px-4 ${
                errors.a && "bg-red-300 border-red-300"
              }`}
            >
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                className="flex-1"
              />
            </View>
            <Text className="mt-1 text-sm text-red-600">
              {errors.b && errors.b.message}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full mt-10 h-14 bg-black my-4 flex items-center justify-center rounded-2xl"
      >
        <View>
          <View className="flex flex-row items-center gap-1">
            <Text className="text-white text-[14px]">Tính ngay</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ActionSheet
        ref={sheet as any}
        containerStyle={{
          padding: 20,
        }}
      >
        <View>
          <Text className="text-center text-xl font-bold mb-6">{result}</Text>
          <TouchableOpacity
            onPress={() => {
              sheet.current.hide();
            }}
            className="w-full h-[52px] bg-black flex items-center justify-center rounded-2xl"
          >
            <View className="flex flex-row items-center gap-1">
              <Text className="text-white text-[16px]">Cancle</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {/* <Text>{result}</Text> */}
    </View>
  );
}
