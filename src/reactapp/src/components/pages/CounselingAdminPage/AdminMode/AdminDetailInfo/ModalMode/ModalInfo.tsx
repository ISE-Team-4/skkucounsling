import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import { UserInfoType } from "../../../interface";
import { ICounselingApplicationDetail } from "../../../../../../dataflow/interface/counselingApplication";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { counselorApplicationStore } from "../../../../../../dataflow/store/counselor/CounselorApplicationStore";

type ModalInfoProps = {
  studentInfo: UserInfoType;
  applicationId: number;
};

const ModalInfo: FC<ModalInfoProps> = ({ studentInfo, applicationId }) => {
  const [appData, setAppData] = useState<Array<ICounselingApplicationDetail>>([]);
  const [currentData, setCurrentData] = useState<ICounselingApplicationDetail>();

  useEffect(() => {
    const fetchApplicationData = async () => {
      await counselorApplicationStore.fetchCouselingApplications(() => {
        setAppData(toJS(counselorApplicationStore.counselingApplications));
      });
    };
    fetchApplicationData().then();

    const fetchCurrentData = async () => {
      await counselorApplicationStore.fetchhCurrentApplication(applicationId, () => {
        setCurrentData(toJS(counselorApplicationStore.currentApplication));
      });
    }
    fetchCurrentData().then();
  }, []);

  const counselingTypeMappings: { [key: string]: string } = {
    personal_1: "검사 해석 상담(검사 후 1회기 해석)",
    personal_5: "5회기 개인 상담",
    personal_10: "10회기 개인 상담",
  };

  const getCounselingType = (type: string) => {
    return counselingTypeMappings[type] || type;
  };

  function getAppliedAt(inputDateString: string): string {
    const inputDate = new Date(inputDateString);

    if (isNaN(inputDate.getTime())) {
      return "Invalid Date";
    }

    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const formattedDate = `${year}년 ${month}월 ${day}일  ${hours}시 ${
      minutes < 10 ? "0" : ""
    }${minutes}분`;

    return formattedDate;
  }

  return (
    <VStack
      style={{
        alignItems: "flex-start",
        padding: "2rem",
        width: "100%",
        marginRight: "2%",
      }}
    >
      <HStack>
        <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
          상담 종류
        </Text>
        <Text marginTop={3} fontSize="smaller" fontWeight="600">
          {getCounselingType(
            currentData?.counseling_type ?? ""
          )}
        </Text>
      </HStack>
      <HStack>
        <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
          상담 분야
        </Text>
        <Text marginTop={3} fontSize="smaller" fontWeight="600">
          {currentData?.counseling_preferfields
            ?.map((field) => field.field)
            ?.join(", ")}
        </Text>
      </HStack>
      <HStack>
        <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
          상담 신청 일시
        </Text>
        <Text marginTop={3} fontSize="smaller" fontWeight="600">
          {getAppliedAt(
            currentData?.applied_at ?? ""
          )}
        </Text>
      </HStack>
      <VStack style={{ alignItems: "flex-start" }}>
        <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
          상담 학생 정보
        </Text>
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          이름 :{" "}
          {currentData?.student.user.realname}
        </Text>
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          학번 :{" "}
          {currentData?.student.user.student_number}
        </Text>
        {/* 학년과 이메일 정보가 API에 없어서 구현 불가. */}
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          이메일 :{" "}
          {currentData?.student.user.email}
        </Text>
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          생년월일 :{" "}
          {currentData?.student.user.birth}
        </Text>
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          연락처 :{" "}
          {currentData?.student.user.phone_number}
        </Text>
      </VStack>
    </VStack>
  );
};

export default ModalInfo;