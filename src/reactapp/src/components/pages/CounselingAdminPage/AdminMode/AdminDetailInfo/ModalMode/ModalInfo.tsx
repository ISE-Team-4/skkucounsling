import { FC, useEffect, useState } from "react";
import { toJS } from "mobx";
import { transferBirth } from "../../../../../../dataflow/DateFunc";
import { ICounselingApplicationDetail } from "../../../../../../dataflow/interface/counselingApplication";
import {
  HStack,
  VStack,
  Text, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { counselorApplicationStore } from "../../../../../../dataflow/store/counselor/CounselorApplicationStore";

type ModalInfoProps = {
  applicationId: number;
};

const ModalInfo: FC<ModalInfoProps> = ({ applicationId }) => {
  const [currentData, setCurrentData] = useState<ICounselingApplicationDetail>();

  useEffect(() => {
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

  const isGreen = (key: string): boolean => {
    return currentData?.counseling_prefertimeslots.some(
      (slot) => slot.timeslot === key
    ) ?? false;
  };

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
          {getCounselingType(currentData?.counseling_type ?? "")}
        </Text>
      </HStack>
      <HStack>
        <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
          상담 분야
        </Text>
        <Text marginTop={3} fontSize="smaller" fontWeight="600">
          {currentData?.counseling_preferfields.map((field) => field.field).join(", ")}
        </Text>
      </HStack>
      <HStack>
        <Text marginTop={3} fontSize="large" fontWeight="800" marginRight={3}>
          상담 신청 일시
        </Text>
        <Text marginTop={3} fontSize="smaller" fontWeight="600">
          {getAppliedAt(currentData?.applied_at ?? "")}
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
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          이메일 :{" "}
          {currentData?.student.user.email}
        </Text>
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          생년월일 :{" "}
          {transferBirth(currentData?.student.user.birth ?? "")}
        </Text>
        <Text marginTop={1} fontSize="smaller" fontWeight="600">
          연락처 :{" "}
          {currentData?.student.user.phone_number}
        </Text>
      </VStack>
      <VStack
        style={{ alignItems: "flex-start", paddingTop: "1rem" }}
      >
        <Text fontSize="large" fontWeight="600">
          희망 상담 시간
        </Text>
        <TableContainer style={{ width: "100%" }}>
          <Table
            colorScheme="gray"
            size="sm"
          >
            <Thead>
              <Tr style={{ backgroundColor: "#D9D9D9" }}>
                <Th style={{ width: "15%", textAlign: "center" }}>시간\요일</Th>
                <Th style={{ textAlign: "center" }}>월</Th>
                <Th style={{ textAlign: "center" }}>화</Th>
                <Th style={{ textAlign: "center" }}>수</Th>
                <Th style={{ textAlign: "center" }}>목</Th>
                <Th style={{ textAlign: "center" }}>금</Th>
              </Tr>
            </Thead>
            <Tbody>
              {["1", "2", "3", "4", "5", "6"].map((time, timeIndex) => {
                const realTime = [10, 11, 13, 14, 15, 16];
                return (
                  <Tr>
                    <Td style={{ backgroundColor: "#D9D9D9" }}>
                      {realTime[timeIndex]}:00~{realTime[timeIndex] + 1}:00
                    </Td>
                    {["MON", "TUE", "WED", "THU", "FRI"].map(
                      (day, dayIndex) => {
                        const key = `${day}${time}`;
                        return (
                          <Td bg={isGreen(key) ? "#579f6e" : "white"}></Td>
                        );
                      }
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </VStack>
  );
};

export default ModalInfo;