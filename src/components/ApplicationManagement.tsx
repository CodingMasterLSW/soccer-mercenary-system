
import React from 'react';
import { ArrowLeft, Users, Star, MessageCircle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Applicant {
  id: number;
  name: string;
  age: number;
  position: string;
  mannerTemperature: number;
  totalMatches: number;
  rating: number;
  location: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ApplicationManagementProps {
  onBack: () => void;
  recruitmentTitle: string;
}

const ApplicationManagement: React.FC<ApplicationManagementProps> = ({ onBack, recruitmentTitle }) => {
  const [applicants, setApplicants] = React.useState<Applicant[]>([
    {
      id: 1,
      name: '이성우',
      age: 29,
      position: 'MF/FW',
      mannerTemperature: 38.2,
      totalMatches: 12,
      rating: 4.8,
      location: '강남구',
      appliedAt: '2025-07-01 14:30',
      status: 'pending'
    },
    {
      id: 2,
      name: '김민수',
      age: 25,
      position: 'DF',
      mannerTemperature: 39.1,
      totalMatches: 28,
      rating: 4.9,
      location: '서초구',
      appliedAt: '2025-07-01 15:45',
      status: 'pending'
    },
    {
      id: 3,
      name: '박준호',
      age: 31,
      position: 'GK',
      mannerTemperature: 35.8,
      totalMatches: 8,
      rating: 4.2,
      location: '강남구',
      appliedAt: '2025-07-01 16:20',
      status: 'pending'
    }
  ]);

  const { toast } = useToast();

  const handleApprove = (applicantId: number) => {
    setApplicants(prev =>
      prev.map(app =>
        app.id === applicantId ? { ...app, status: 'approved' as const } : app
      )
    );
    
    toast({
      title: "지원자를 승인했습니다!",
      description: "해당 용병에게 승인 알림이 발송됩니다.",
      duration: 3000,
    });
  };

  const handleReject = (applicantId: number) => {
    setApplicants(prev =>
      prev.map(app =>
        app.id === applicantId ? { ...app, status: 'rejected' as const } : app
      )
    );
    
    toast({
      title: "지원자를 거절했습니다.",
      description: "해당 용병에게 거절 알림이 발송됩니다.",
      duration: 3000,
    });
  };

  const getMannerColor = (temp: number) => {
    if (temp >= 38.0) return 'text-green-600 bg-green-50';
    if (temp >= 36.5) return 'text-blue-600 bg-blue-50';
    return 'text-red-600 bg-red-50';
  };

  const getMannerLevel = (temp: number) => {
    if (temp >= 38.0) return '매우 좋음';
    if (temp >= 37.0) return '좋음';
    if (temp >= 36.5) return '보통';
    return '주의';
  };

  const pendingCount = applicants.filter(app => app.status === 'pending').length;
  const approvedCount = applicants.filter(app => app.status === 'approved').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            size="icon"
            className="hover:bg-white hover:bg-opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">지원자 관리</h1>
            <p className="text-gray-600">{recruitmentTitle}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-2 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{pendingCount}</p>
                  <p className="text-sm text-gray-600">대기 중</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                  <p className="text-sm text-gray-600">승인됨</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{applicants.length}</p>
                  <p className="text-sm text-gray-600">총 지원자</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <Card key={applicant.id} className="border-2 border-gray-200 hover:border-emerald-200 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      {applicant.name[0]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{applicant.name}</h3>
                        <Badge variant="outline">{applicant.age}세</Badge>
                        <Badge variant="secondary">{applicant.position}</Badge>
                        <Badge 
                          variant="outline" 
                          className={`${getMannerColor(applicant.mannerTemperature)} border-0`}
                        >
                          🌡️ {applicant.mannerTemperature}°C ({getMannerLevel(applicant.mannerTemperature)})
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>평점 {applicant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span>{applicant.totalMatches}경기</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-gray-500" />
                          <span>{applicant.location}</span>
                        </div>
                        <div>
                          <span>신청: {applicant.appliedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {applicant.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => handleReject(applicant.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          거절
                        </Button>
                        <Button
                          onClick={() => handleApprove(applicant.id)}
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          승인
                        </Button>
                      </>
                    )}
                    
                    {applicant.status === 'approved' && (
                      <Badge className="bg-green-100 text-green-700">승인됨</Badge>
                    )}
                    
                    {applicant.status === 'rejected' && (
                      <Badge variant="destructive">거절됨</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {applicants.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">아직 지원자가 없습니다</h3>
              <p className="text-gray-600">용병들이 지원하면 여기에 표시됩니다.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicationManagement;
